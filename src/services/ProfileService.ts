import api from './api';

interface ProfileInfo {
  github_login: string;
  avatar_url: string;
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
}

export default ProfileService;
