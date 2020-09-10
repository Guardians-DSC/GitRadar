import api from './api';

export interface ProfileInfo {
  github_login: string;
  avatar_url: string;
}

class GetUserService {
  public async execute(username: string): Promise<ProfileInfo> {
    const response = await api.get(`/users/${username}`);
    const { login, avatar_url } = response.data;

    return {
      github_login: login,
      avatar_url,
    };
  }
}

export default GetUserService;
