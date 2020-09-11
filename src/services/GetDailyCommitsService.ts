import api from './api';
import Event from '../entities/Event';

interface Commit {
  repository: {
    name: string;
    html_url: string;
  };
  message: string;
}

interface Response {
  new_commits: number;
  commits: Commit[];
}

class GetDailyCommitsService {
  public async execute(username: string) {
    const response = await api.get(`/users/${username}/events`);
    const events: Event[] = response.data;
  }
}

export default GetDailyCommitsService;
