import api from './api';
import { catchGitHubNotFound } from '../utils/exceptions';
import Event from '../githubEntities/Event';
import GetRepositoriesService from './GetRepositoriesService';

interface EventsCounter {
  [type: string]: number;
}

interface Response {
  new_interactions: number;
  new_forks: number;
  new_stars: number;
  new_repositories: number;
  new_prs: number;
  new_issues: number;
}

function isToday(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

class GetDailyEventsService {
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

      return isToday(today, eventDate);
    });

    const eventsCounter: EventsCounter = {
      ForkEvent: 0,
      IssueEvent: 0,
      PullRequestEvent: 0,
      WatchEvent: 0,
    };

    events.forEach(item => {
      if (eventsCounter[item.type]) {
        eventsCounter[item.type] += 1;
      } else {
        eventsCounter[item.type] = 1;
      }
    });

    const getRepositoriesService = new GetRepositoriesService();
    let repositories = await getRepositoriesService.execute(username);

    repositories = repositories.filter(item => {
      const eventDate = new Date(item.created_at);
      const today = new Date();

      return isToday(today, eventDate);
    });

    const totalInteractions =
      eventsCounter.ForkEvent +
      eventsCounter.IssueEvent +
      eventsCounter.PullRequestEvent +
      eventsCounter.WatchEvent +
      repositories.length;

    return {
      new_forks: eventsCounter.ForkEvent,
      new_issues: eventsCounter.IssueEvent,
      new_prs: eventsCounter.PullRequestEvent,
      new_stars: eventsCounter.WatchEvent,
      new_repositories: repositories.length,
      new_interactions: totalInteractions,
    };
  }
}

export default GetDailyEventsService;
