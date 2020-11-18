import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import api from '../githubApi/RestApi';
import Manager from '../../models/Manager';
import AppError from '../../errors/AppError';

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
    const managersRepository = getRepository(Manager);

    const existsManager = await managersRepository.findOne({
      email,
    });

    if (existsManager) {
      throw new AppError('E-mail address already used');
    }

    const githubData = await api.get(`/users/${github_login}`);

    const { login, name, avatar_url, id } = githubData.data;

    const hashedPassword = await hash(password, 8);

    const manager = await managersRepository.create({
      avatar_url,
      email,
      name,
      github_login: login,
      github_id: id,
      password: hashedPassword,
    });

    await managersRepository.save(manager);
    delete manager.password;

    return manager;
  }
}

export default CreateManagerService;
