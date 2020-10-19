import GetUserService from './GetUserService';
import GetRepositoriesService from './GetRepositoriesService';
import Profile from '../entities/Profile';

class GetProfileService {
  public async execute(username: string): Promise<Profile> {
    const getUserService = new GetUserService();
    const getRepositoriesService = new GetRepositoriesService();

    const { avatar_url, github_login } = await getUserService.execute({
      username,
    });
    const repositories = await getRepositoriesService.execute(username);

    return {
      github_login,
      avatar_url,
      repositories,
    };
  }
}

export default GetProfileService;
