import GetUserService from './GetUserService';
import GetDailyCommitsService from './GetDailyCommitsService';
import GetDailyEventsService from './GetDailyEventsService';

interface Commit {
  repository: {
    name: string;
    url: string;
  };
  sha: string;
  message: string;
  additions: number;
  deletions: number;
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
    additions: number;
    deletions: number;
    commits: Commit[];
    created_at: string;
  };
}

class GetUserDaily {
  public async execute(username: string): Promise<Response> {
    const getUserService = new GetUserService();
    const { github_login, avatar_url } = await getUserService.execute({
      username,
    });

    const getDailyCommitsService = new GetDailyCommitsService();
    const { new_commits, commits } = await getDailyCommitsService.execute(
      username,
    );

    let additions = 0;
    let deletions = 0;
    commits.forEach(item => {
      additions += item.additions;
      deletions += item.deletions;
    });

    const getDailyEventsService = new GetDailyEventsService();
    const {
      new_forks,
      new_interactions,
      new_issues,
      new_prs,
      new_repositories,
      new_stars,
    } = await getDailyEventsService.execute(username);

    return {
      user: {
        github_login,
        avatar_url,
      },
      payload: {
        new_forks,
        new_interactions,
        new_issues,
        new_prs,
        new_repositories,
        new_stars,
        new_commits,
        additions,
        deletions,
        commits,
        created_at: new Date().toISOString(),
      },
    };
  }
}

export default GetUserDaily;
