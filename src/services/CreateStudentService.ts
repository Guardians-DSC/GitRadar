import { getRepository } from 'typeorm';
import Student from '../models/Student';

interface Request {
  teacher_id: string;
  github_login: string;
  avatar_url: string;
  top_language: string;
}

class CreateStudentService {
  async execute({
    teacher_id,
    github_login,
    avatar_url,
    top_language,
  }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const student = studentsRepository.create({
      teacher_id,
      github_login,
      avatar_url,
      top_language,
    });
    await studentsRepository.save(student);

    return student;
  }
}

export default CreateStudentService;
