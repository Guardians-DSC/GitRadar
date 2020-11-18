import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Manager from '../models/Manager';
import AppError from '../errors/AppError';

interface Response {
  manager: Manager;
  token: string;
}

class AuthenticateManagerService {
  public async execute(email: string, password: string): Promise<Response> {
    const managersRepository = getRepository(Manager);

    const manager = await managersRepository.findOne({ email });

    if (!manager) {
      throw new AppError('E-mail not found.', 404);
    }

    const passwordMatched = await compare(password, manager.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password.', 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError('Internal server error.', 500);
    }

    const token = jwt.sign({}, secret, {
      subject: manager.id,
      expiresIn: '7d',
    });

    return { manager, token };
  }
}

export default AuthenticateManagerService;
