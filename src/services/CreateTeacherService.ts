import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Teacher from '../models/Teacher';

interface CreateTeacherRequest {
  avatar_url: string;
  email: string;
  github_login: string;
  name: string;
  password: string;
}

class CreateTeacherService {
  async execute({
    avatar_url,
    email,
    github_login,
    name,
    password,
  }: CreateTeacherRequest): Promise<Teacher> {
    const teachersRepository = getRepository(Teacher);

    const userExists = await teachersRepository.findOne({
      email,
    });

    if (userExists) {
      throw new AppError('E-mail address already used');
    }

    const hashedPassword = await hash(password, 8);

    const teacher = teachersRepository.create({
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
