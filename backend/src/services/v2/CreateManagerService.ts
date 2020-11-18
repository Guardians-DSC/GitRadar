import { getRepository } from 'typeorm';
import Manager from '../../models/v2/Manager';
import api from '../githubApi/RestApi';

interface Request {
  github_login: string;
  email: string;
  password: string;
}

interface Response {
  id: string;
  github_login: string;
  email: string;
  avatar_url: string;
  name: string;
}

class CreateManagerService {
  public async execute({
    github_login,
    email,
    password,
  }: Request): Promise<Response> {
    const managerRepository = getRepository(Manager);

    const githubData = await api.post(`/user/${github_login}`);

    console.log(githubData.data);

    return null;
  }
}

export default CreateManagerService;
