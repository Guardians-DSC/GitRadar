import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Teacher from '../models/Teacher';

class CreateTeacherService {
  async execute(email: string, password: string): Promise<Teacher> {
    const teachersRepository = getRepository(Teacher);

    const userExists = await teachersRepository.findOne({ email });

    if (userExists) {
      throw new AppError('E-mail address already used');
    }

    const hashedPassword = await hash(password, 8);

    const teacher = teachersRepository.create({
      email,
      password: hashedPassword,
    });
    await teachersRepository.save(teacher);

    return teacher;
  }
}

export default CreateTeacherService;
