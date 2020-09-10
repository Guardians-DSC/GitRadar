import api from './api';

interface Response {
  github_login: string;
  avatar_url: string;
}

class GetUserService {
  public async execute(username: string): Promise<Response> {
    const response = await api.get(`/users/${username}`);
    const { login, avatar_url } = response.data;

    return {
      github_login: login,
      avatar_url,
    };
  }
}

export default GetUserService;
