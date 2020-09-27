import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Teacher from '../models/Teacher';

interface RequestOptions {
  name?: string;
  password?: string;
  github_token?: string;
  avatar_url?: string;
}

class EditModelService {
  async execute(username: string, options: RequestOptions): Promise<Teacher> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne({
      github_login: username,
    });
    if (!teacher) {
      throw new AppError('Teacher not found.', 404);
    }

    if (options.name) teacher.name = options.name;
    if (options.password) teacher.password = options.password;
    if (options.github_token) teacher.github_token = options.github_token;
    if (options.avatar_url) teacher.avatar_url = options.avatar_url;

    await teachersRepository.save(teacher);

    return teacher;
  }
}

export default EditModelService;
