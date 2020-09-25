import api from './api';
import Event from '../entities/Event';
import { catchGitHubNotFound } from '../utils/exceptions';

interface Commit {
  repository: {
    name: string;
    url: string;
  };
  message: string;
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
    events.forEach(item => {
      if (item.payload.commits) {
        const newCommits: Commit[] = item.payload.commits.map(commit => {
          return {
            repository: item.repo,
            message: commit.message,
          };
        });

        commits = [...commits, ...newCommits];
      }
    });

    return {
      new_commits: commits.length,
      commits,
    };
  }
}

export default GetDailyCommitsService;
