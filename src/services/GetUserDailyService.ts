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
  new_interactions: number;
  new_forks: number;
  new_stars: number;
  new_repositories: number;
  new_prs: number;
  new_issues: number;
  new_commits: number;
  commits: Commit[];
}

class GetUserDaily {
  public async execute(username: string): Promise<Response> {
    const getDailyCommitsService = new GetDailyCommitsService();
    const getDailyEventsService = new GetDailyEventsService();

    const dailyCommits = await getDailyCommitsService.execute(username);
    const dailyEvents = await getDailyEventsService.execute(username);

    return {
      ...dailyEvents,
      ...dailyCommits,
    };
  }
}

export default GetUserDaily;
