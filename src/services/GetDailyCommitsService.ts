import api from './api';
import Event from '../entities/Event';
import { catchGitHubNotFound } from '../utils/exceptions';
import AppError from '../errors/AppError';

interface Commit {
  repository: {
    name: string;
    url: string;
  };
  message: string;
  additions: number;
  deletions: number;
}

interface Response {
  new_commits: number;
  commits: Commit[];
}

function isToday(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

class GetDailyCommitsService {
  public async execute(username: string): Promise<Response> {
    let response;
    try {
      response = await api.get(`/users/${username}/events`);
    } catch (error) {
      throw catchGitHubNotFound(error);
    }
    let events: Event[] = response.data;

    events = events.filter(item => {
      const eventDate = new Date(item.created_at);
      const today = new Date();

      return isToday(today, eventDate) && item.payload.commits;
    });

    let commits: Commit[] = [];

    const eventPromise = async (item: Event) => {
      const currentRepository = item.repo;

      if (item.payload.commits) {
        const newCommits: Commit[] = [];

        const commitPromises = item.payload.commits.map(commit => {
          const commitPromise = async () => {
            try {
              response = await api.get(
                `/repos/${currentRepository.name}/commits/${commit.sha}`,
              );
            } catch (error) {
              throw new AppError('Unable to obtain stats commit', 500);
            }
            const { stats } = response.data;

            newCommits.push({
              repository: item.repo,
              message: commit.message,
              additions: stats.additions,
              deletions: stats.deletions,
            });
          };

          return commitPromise();
        });
        await Promise.all(commitPromises);

        commits = [...commits, ...newCommits];
      }
    };

    const eventPromises = events.map(item => eventPromise(item));
    await Promise.all(eventPromises);

    return {
      new_commits: commits.length,
      commits,
    };
  }
}

export default GetDailyCommitsService;
