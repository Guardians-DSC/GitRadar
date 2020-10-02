import { getRepository } from 'typeorm';
import Teacher from '../models/Teacher';

class GetTeacherTokenService {
  public async execute(): Promise<string> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne();

    const { github_token } = teacher;

    return github_token;
  }
}

export default GetTeacherTokenService;
