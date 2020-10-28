import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Repository from '../models/Repository';
import Student from '../models/Student';
import GetUserService from '../services/GetUserService';

class RepositoryController {
  static async index(request: Request, response: Response): Promise<Response> {
    const studentRepository = getRepository(Student);
    const repositoriesRepository = getRepository(Repository);

    const { username } = request.params;
    if (!username) {
      throw new AppError('Github username in params is required.', 400);
    }

    const getUser = new GetUserService();
    const { github_id } = await getUser.execute({
      username,
    });

    const student = await studentRepository.findOne({ where: { github_id } });

    const studentRepositories = await repositoriesRepository.find({
      where: { student_id: student.id },
    });

    return response.json(studentRepositories);
  }
}

export default RepositoryController;
