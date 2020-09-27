import api from './api';
import { catchGitHubNotFound } from '../utils/exceptions';

interface Response {
  github_login: string;
  avatar_url: string;
  name: string;
}

class GetUserService {
  public async execute(username: string): Promise<Response> {
    let response;
    try {
      response = await api.get(`/users/${username}`);
    } catch (error) {
      throw catchGitHubNotFound(error);
    }
    const { login, avatar_url, name } = response.data;

    return {
      github_login: login,
      avatar_url,
      name,
    };
  }
}

export default GetUserService;
