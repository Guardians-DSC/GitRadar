import api from './api';

interface Commit {
  message: string;
}

interface Event {
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits: Commit[];
  };
}

class GetDailyEventsService {
  public async execute(username: string) {
    const response = await api.get(`/users/${username}/events`);
    const events: Event[] = response.data;
  }
}

export default GetDailyEventsService;
