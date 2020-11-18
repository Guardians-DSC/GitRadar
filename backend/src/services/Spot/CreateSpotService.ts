import { getRepository } from 'typeorm';
import Manager from '../../models/Manager';
import Spot from '../../models/Spot';
import { AppError } from '../../errors/AppError';
import api from '../githubApi/GraphQLApi';
import Repository from '../../models/Repository';

interface Request {
  manager_id: string;
  spot_github_login: string;
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
}

interface Response {
  github_login: string;
  avatar_url: string;
  repositories: RepositoryInfo[];
}

class CreateSpotService {
  async execute({ manager_id, spot_github_login }: Request): Promise<Response> {
    const managersRepository = getRepository(Manager);
    const spotsRepository = getRepository(Spot);
    const repositoriesRepository = getRepository(Repository);

    const existsManager = await managersRepository.findOne({
      id: manager_id,
    });

    if (!existsManager) {
      throw new AppError('Manager does not exists');
    }

    const existsSpot = await spotsRepository.findOne({
      github_login: spot_github_login,
    });

    if (existsSpot) {
      throw new AppError('Spot already registered');
    }

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

    console.log(name);

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

    const { github_login, avatar_url } = await spotsRepository.findOne({
      id: spot_id,
    });

    const spotRepositories = await repositoriesRepository.find({
      spot_id,
    });

    const repositoriesReponse = spotRepositories.map(
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

    return { github_login, avatar_url, repositories: repositoriesReponse };
  }

  private getQuery(github_id: string): string {
    const query = `query { 
      user(login: "${github_id}") {
        login
        avatarUrl
        name
        id
        repositories(first: 100 privacy: PUBLIC affiliations: OWNER) {
          nodes {
            nameWithOwner
            name
            description
            url
            id
          }
        }
      }
    }`;

    return query;
  }
}

export default CreateSpotService;
