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

interface Repository {
  id: string;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  created_at: string;
  language: string;
}

interface Response {
  github_login: string;
  avatar_url: string;
  repositories: Repository[];
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

    if (!existsSpot) {
      throw new AppError('Spot already registered');
    }

    const spotGithubData = await api.post('', {
      query: this.getQuery(spot_github_login),
    });

    console.log(spotGithubData.data);

    return null;
  }

  private getQuery(github_id: string): string {
    const query = `query { 
      user(login: "${github_id}") {
        bio
        login
        name
        avatarUrl
        id
        repositories(first: 100 privacy: PUBLIC affiliations: OWNER) {
          nodes {
            nameWithOwner
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
