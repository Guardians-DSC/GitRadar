import { getRepository } from 'typeorm';
import crypto from 'crypto';
import AppError from '../errors/AppError';
import Teacher from '../models/Teacher';

function decrypt(word: string): string {
  const cryptoAlgorithm = process.env.CRYPTO_ALGORITHM;
  const cryptoSecret = process.env.CRYPTO_SECRET;

  if (!cryptoAlgorithm || !cryptoSecret) {
    throw new AppError('Internal server error.', 500);
  }

  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createDecipheriv(cryptoAlgorithm, cryptoSecret, iv);

  cipher.update(word, 'hex', 'utf8');
  return cipher.final('utf8');
}

class GetTeacherTokenService {
  public async execute(): Promise<string> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne();

    const { github_token } = teacher;

    return decrypt(github_token);
  }
}

export default GetTeacherTokenService;
