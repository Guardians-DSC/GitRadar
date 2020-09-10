import api from './api';

interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
}

class GetRepositoriesService {
  public async execute(username: string): Promise<Repository[]> {
    const response = await api.get(`/users/${username}/repos`);
    let repositories = response.data as Repository[];

    repositories = repositories.map(item => {
      const { name, full_name, description, html_url } = item;

      return {
        name,
        full_name,
        description,
        html_url,
      };
    });

    return repositories;
  }
}

export default GetRepositoriesService;
