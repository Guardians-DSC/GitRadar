import GetUserService from './GetUserService';
import GetRepositoriesService from './GetRepositoriesService';
import Profile from '../entities/Profile';

class GetProfileService {
  public async execute(username: string): Promise<Profile> {
    const getUserService = new GetUserService();
    const getRepositoriesService = new GetRepositoriesService();

    const profileInfo = await getUserService.execute(username);
    const repositories = await getRepositoriesService.execute(username);

    return {
      ...profileInfo,
      repositories,
    };
  }
}

export default GetProfileService;
