import { getRepository } from 'typeorm';
import api from './githubApi/RestApi';
import Teacher from '../models/Teacher';

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
    const managerRepository = getRepository(Teacher);

    const githubData = await api.get(`/users/${github_login}`);

    const { login, name, avatar_url, id } = githubData.data;

    return null;
  }
}

export default CreateManagerService;
