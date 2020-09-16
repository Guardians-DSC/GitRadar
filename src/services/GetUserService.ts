import api from './api';
import AppError from '../errors/AppError';

interface Response {
  github_login: string;
  avatar_url: string;
}

class GetUserService {
  public async execute(username: string): Promise<Response> {
    let response;
    try {
      response = await api.get(`/users/${username}`);
    } catch (error) {
      throw new AppError('GitHub username not found!', 404);
    }
    const { login, avatar_url } = response.data;

    return {
      github_login: login,
      avatar_url,
    };
  }
}

export default GetUserService;
