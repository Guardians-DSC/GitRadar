import api from './api';
import Repository from '../entities/Repository';

class GetRepositoriesService {
  public async execute(username: string): Promise<Repository[]> {
    const response = await api.get(`/users/${username}/repos`);
    let repositories: Repository[] = response.data;

    repositories = repositories.map(item => {
      const { name, full_name, description, html_url, language, created_at } = item;

      return {
        name,
        full_name,
        description,
        html_url,
        created_at,
        language,
      };
    });

    return repositories;
  }
}

export default GetRepositoriesService;
