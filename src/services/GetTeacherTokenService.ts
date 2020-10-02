import { getRepository } from 'typeorm';
import Teacher from '../models/Teacher';

class GetTeacherTokenService {
  public async execute(): Promise<string> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne();

    const { github_login } = teacher;

    return github_login;
  }
}

export default GetTeacherTokenService;
