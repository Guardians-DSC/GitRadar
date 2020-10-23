import { getRepository } from 'typeorm';
import Student from '../models/Student';

interface Request {
  github_id: string;
  teacher_id: string;
  name: string;
  github_login: string;
  avatar_url: string;
  top_language: string;
}

class CreateStudentService {
  async execute({
    github_id,
    teacher_id,
    name,
    github_login,
    avatar_url,
    top_language,
  }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const student = studentsRepository.create({
      teacher_id,
      github_id,
      name,
      github_login,
      avatar_url,
      top_language,
    });
    await studentsRepository.save(student);

    return student;
  }
}

export default CreateStudentService;
