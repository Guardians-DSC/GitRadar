import api from './api';
import Repository from '../entities/Repository';

class GetRepositoriesService {
  public async execute(username: string): Promise<Repository[]> {
    const response = await api.get(`/users/${username}/repos`);
    let repositories = response.data as Repository[];

    repositories = repositories.map(item => {
      const { name, full_name, description, html_url, language } = item;

      return {
        name,
        full_name,
        description,
        html_url,
        language,
      };
    });

    return repositories;
  }
}

export default GetRepositoriesService;
