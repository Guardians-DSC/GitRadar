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
  created_at: string;
}

interface EventsCounter {
  [type: string]: number;
}

interface Response {
  new_interactions: number;
  new_forks: number;
  new_stars: number;
  new_commits: number;
  new_repositories: number;
  new_prs: number;
  new_issues: number;
}

class GetDailyEventsService {
  public async execute(username: string): Promise<Response> {
    const response = await api.get(`/users/${username}/events`);
    let events: Event[] = response.data;

    events = events.filter(item => {
      const eventDate = new Date(item.created_at);
      const today = new Date();

      const isToday =
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();

      return isToday;
    });

    const eventsCounter: EventsCounter = {};
    events.forEach(item => {
      if (eventsCounter[item.type]) {
        eventsCounter[item.type] += 1;
      } else {
        eventsCounter[item.type] = 1;
      }
    });

    return {
      new_forks: eventsCounter['ForkEvent'],
      new_issues: eventsCounter['IssueEvent'],
      new_prs: eventsCounter['PullRequestEvent'],
      new_stars: eventsCounter['WatchEvent'],
      new_repositories: 0,
      new_commits: 0,
      new_interactions: 0,
    };
  }
}

export default GetDailyEventsService;
