import { getRepository } from 'typeorm';
import Teacher from '../models/Teacher';
import { decrypt } from '../utils/crypto';

class GetTeacherTokenService {
  public async execute(): Promise<string> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne();

    const { github_token } = teacher;

    return decrypt(github_token);
  }
}

export default GetTeacherTokenService;
