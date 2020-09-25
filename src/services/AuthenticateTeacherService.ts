import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Teacher from '../models/Teacher';
import AppError from '../errors/AppError';

interface Response {
  teacher: Teacher;
  token: string;
}

class AuthenticateTeacherService {
  public async execute(email: string, password: string): Promise<Response> {
    const teachersRepository = getRepository(Teacher);

    const teacher = await teachersRepository.findOne({ email });

    if (!teacher) {
      throw new AppError('E-mail not found.', 404);
    }

    const passwordMatched = await compare(password, teacher.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password.', 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError('Internal server error.', 500);
    }

    const token = jwt.sign({ teacherId: teacher.id }, secret, {
      subject: teacher.id,
      expiresIn: '7d',
    });

    return { teacher, token };
  }
}

export default AuthenticateTeacherService;
