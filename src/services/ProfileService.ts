import api from './api';

interface ProfileInfo {
  github_login: string;
  avatar_url: string;
}

interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
}

class ProfileService {
  username: string;

  constructor(username: string) {
    this.username = username;
  }

  public async getProfileInfo(): Promise<ProfileInfo> {
    const response = await api.get(`/users/${this.username}`);
    const { login, avatar_url } = response.data;

    return {
      github_login: login,
      avatar_url,
    };
  }

  public async getRepositories(): Promise<Repository[]> {
    const response = await api.get(`/users/${this.username}/repos`);
    let repositories = response.data;

    repositories = repositories.map((item: Repository) => {
      const { name, full_name, description, html_url } = item;

      return {
        name,
        full_name,
        description,
        html_url,
      };
    });

    return repositories;
  }
}

export default ProfileService;
