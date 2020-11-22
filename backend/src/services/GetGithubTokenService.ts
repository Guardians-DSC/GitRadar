import { getRepository } from 'typeorm';
import Manager from '../models/Manager';
import { decrypt } from '../utils/crypto';

class GetGithubTokenService {
  async execute(): Promise<string> {
    const managersRepository = getRepository(Manager);

    const manager = await managersRepository.findOne();
    if (!manager || !manager.github_token) return '';

    return decrypt(manager.github_token);
  }
}

export default GetGithubTokenService;
