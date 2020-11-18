import { getRepository } from 'typeorm';
import Teacher from '../models/Manager';
import { decrypt } from '../utils/crypto';

class GetGithubTokenService {
  async execute(): Promise<string> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne();
    if (!teacher || !teacher.github_token) return '';

    return decrypt(teacher.github_token);
  }
}

export default GetGithubTokenService;
