import api from './api';
import Event from '../entities/Event';

class GetDailyCommitsService {
  public async execute(username: string) {
    const response = await api.get(`/users/${username}/events`);
    const events: Event[] = response.data;
  }
}

export default GetDailyCommitsService;
