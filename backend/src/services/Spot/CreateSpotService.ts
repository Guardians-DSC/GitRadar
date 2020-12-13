import { getRepository } from 'typeorm';
import Manager from '../../models/Manager';
import Spot from '../../models/Spot';
import { AppError } from '../../errors/AppError';
import api from '../githubApi/GraphQLApi';
import Repository from '../../models/Repository';
import { queueProvider } from '../../app';
import Project from '../../models/Project';

interface Request {
  manager_id: string;
  spot_github_login: string;
  project_id: string;
}

interface RepositoryInfo {
  id: string;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
}

interface RepositoryNode {
  nameWithOwner: string;
  name: string;
  description: string;
  url: string;
  id: string;
  primaryLanguage: {
    name: string;
  };
}

interface Response {
  github_login: string;
  avatar_url: string;
  repositories: RepositoryInfo[];
}

class CreateSpotService {
  async execute({
    manager_id,
    spot_github_login,
    project_id,
  }: Request): Promise<Response> {
    const managersRepository = getRepository(Manager);
    const spotsRepository = getRepository(Spot);
    const projectsRepository = getRepository(Project);

    const existsManager = await managersRepository.findOne({
      id: manager_id,
    });

    if (!existsManager) {
      throw new AppError('Manager does not exist');
    }

    const project = await projectsRepository.findOne(
      { id: project_id },
      { relations: ['spots'] },
    );
    if (!project) {
      throw new AppError('Project does not exist');
    }

    let spot = await spotsRepository.findOne(
      {
        github_login: spot_github_login,
      },
      { loadEagerRelations: false },
    );

    if (project.spots.find(current => current.id === spot.id)) {
      throw new AppError('Spot already registered');
    }

    if (!spot) {
      spot = await this.createSpot(spot_github_login, manager_id);
    }

    project.spots.push(spot);
    await projectsRepository.save(project);

    const repositories = await this.getRepositories(spot.id);
    return {
      avatar_url: spot.avatar_url,
      github_login: spot.github_login,
      repositories,
    };
  }

  private async createSpot(
    spot_github_login: string,
    manager_id: string,
  ): Promise<Spot> {
    const spotsRepository = getRepository(Spot);
    const repositoriesRepository = getRepository(Repository);

    const spotGithubData = await api.post('', {
      query: this.getQuery(spot_github_login),
    });

    const {
      login,
      name,
      avatarUrl,
      id,
      repositories,
    } = spotGithubData.data.data.user;

    const spot = spotsRepository.create({
      avatar_url: avatarUrl,
      github_id: id,
      manager_id,
      name,
      github_login: login,
      top_language: 'none',
    });

    const savedSpot = await spotsRepository.save(spot);
    const { id: spot_id } = savedSpot;

    // save Repositories
    const repositoriesNode: RepositoryNode[] = repositories.nodes;

    for (const data of repositoriesNode) {
      const {
        description,
        id: repository_id,
        name: repositoy_name,
        nameWithOwner: full_name,
        url,
      } = data;

      const repository = repositoriesRepository.create({
        description,
        github_id: repository_id,
        name: repositoy_name,
        full_name,
        spot_id,
        html_url: url,
      });

      await repositoriesRepository.save(repository);
    }

    queueProvider.add({
      job: {
        spot_id: spot.id,
      },
      jobName: `${spot.github_login} process initial request`,
      queueName: 'initial-spot-process-requester',
      opts: {
        removeOnComplete: false,
      },
    });

    return savedSpot;
  }

  private async getRepositories(spot_id: string): Promise<RepositoryInfo[]> {
    const repositoriesRepository = getRepository(Repository);

    const spotRepositories = await repositoriesRepository.find({
      spot_id,
    });

    const repositoriesResponse: RepositoryInfo[] = spotRepositories.map(
      ({
        id: repository_id,
        name: repository_name,
        full_name,
        description,
        html_url,
      }) => {
        const parsedRepository = {
          id: repository_id,
          name: repository_name,
          full_name,
          description,
          html_url,
        };

        return parsedRepository;
      },
    );

    return repositoriesResponse;
  }

  private getQuery(github_id: string): string {
    const query = `query { 
      user(login: "${github_id}") {
        login
        avatarUrl
        name
        id
        repositories(first: 100 privacy: PUBLIC affiliations: OWNER ownerAffiliations:OWNER) {
          nodes {
            nameWithOwner
            name
            description
            url
            id
            primaryLanguage {
              name
            }
          }
        }
      }
    }`;

    return query;
  }
}

export default CreateSpotService;
