import api from './api';

class GetDailyEventsService {
  public async execute(username: string) {
    const response = await api.get(`/users/${username}/events`);
  }
}

export default GetDailyEventsService;
