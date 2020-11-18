import api from './githubApi/RestApi';
import { catchGitHubNotFound } from '../utils/exceptions';
import AppError from '../errors/AppError';

interface Request {
  username?: string;
  github_id?: string;
}

interface Response {
  github_id: string;
  github_login: string;
  avatar_url: string;
  name: string;
}

class GetUserService {
  public async execute({ username, github_id }: Request): Promise<Response> {
    let response;
    if (username) {
      try {
        response = await api.get(`/users/${username}`);
      } catch (error) {
        throw catchGitHubNotFound(error);
      }
    } else if (github_id) {
      try {
        response = await api.get(`/user/${github_id}`);
      } catch (error) {
        throw catchGitHubNotFound(error);
      }
    } else {
      throw new AppError('Github Login or Github ID is missing', 400);
    }
    const { id, login, avatar_url, name } = response.data;

    return {
      github_id: String(id),
      github_login: login,
      avatar_url,
      name,
    };
  }
}

export default GetUserService;
