import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Teacher from '../../models/Teacher';

interface RequestOptions {
  name?: string;
  password?: string;
  github_token?: string;
  avatar_url?: string;
}

class EditTeacherService {
  async execute(
    username: string,
    { name, password, avatar_url, github_token }: RequestOptions,
  ): Promise<Teacher> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne({
      github_login: username,
    });
    if (!teacher) {
      throw new AppError('Teacher not found.', 404);
    }

    if (name) teacher.name = name;
    if (password) teacher.password = password;
    if (github_token) teacher.github_token = github_token;
    if (avatar_url) teacher.avatar_url = avatar_url;

    await teachersRepository.save(teacher);

    return teacher;
  }
}

export default EditTeacherService;
