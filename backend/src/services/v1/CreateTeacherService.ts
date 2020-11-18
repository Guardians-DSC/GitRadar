import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Teacher from '../models/Teacher';
import GetUserService from './GetUserService';

interface CreateTeacherRequest {
  github_id: string;
  email: string;
  github_login: string;
  password: string;
}

class CreateTeacherService {
  async execute({
    github_id,
    email,
    github_login,
    password,
  }: CreateTeacherRequest): Promise<Teacher> {
    const teachersRepository = getRepository(Teacher);

    const userExists = await teachersRepository.findOne({
      email,
    });

    if (userExists) {
      throw new AppError('E-mail address already used');
    }

    const getUser = new GetUserService();
    const { avatar_url, name } = await getUser.execute({
      username: github_login,
    });

    const hashedPassword = await hash(password, 8);

    const teacher = teachersRepository.create({
      github_id,
      avatar_url,
      email,
      github_login,
      name,
      password: hashedPassword,
    });
    await teachersRepository.save(teacher);

    return teacher;
  }
}

export default CreateTeacherService;
