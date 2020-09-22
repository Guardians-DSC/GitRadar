import GetUserService from './GetUserService';
import GetDailyCommitsService from './GetDailyCommitsService';
import GetDailyEventsService from './GetDailyEventsService';

interface Commit {
  repository: {
    name: string;
    url: string;
  };
  message: string;
}

interface Response {
  user: {
    github_login: string;
    avatar_url: string;
  };
  payload: {
    new_interactions: number;
    new_forks: number;
    new_stars: number;
    new_repositories: number;
    new_prs: number;
    new_issues: number;
    new_commits: number;
    commits: Commit[];
    created_at: string;
  };
}

class GetUserDaily {
  public async execute(username: string): Promise<Response> {
    const getUserService = new GetUserService();
    const getDailyCommitsService = new GetDailyCommitsService();
    const getDailyEventsService = new GetDailyEventsService();

    const userInfo = await getUserService.execute(username);
    const dailyCommits = await getDailyCommitsService.execute(username);
    const dailyEvents = await getDailyEventsService.execute(username);

    return {
      user: {
        ...userInfo,
      },
      payload: {
        ...dailyEvents,
        ...dailyCommits,
        created_at: new Date().toISOString(),
      },
    };
  }
}

export default GetUserDaily;
