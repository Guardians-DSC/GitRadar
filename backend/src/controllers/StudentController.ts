import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

import GetUserService from '../services/GetUserService';
import GetProfileService from '../services/GetProfileService';
import GetLanguagesService from '../services/GetLanguagesService';
import CreateStudentService from '../services/CreateStudentService';
import CreateRepositoryService from '../services/CreateRepositoryService';
import GetPeriodStudentDailyReportsService from '../services/GetPeriodStudentDailyReportsService';
import Student from '../models/Student';

class StudentController {
  static async store(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      github_login: yup.string().required('Student github_login is required.'),
    });

    await schema.validate(request.body);

    const { github_login } = request.body;
    const { teacher } = request;

    const getProfile = new GetProfileService();
    const { avatar_url, repositories } = await getProfile.execute(github_login);

    const getLanguages = new GetLanguagesService();
    const { top_language } = await getLanguages.execute(github_login);

    const getUser = new GetUserService();
    const { github_id } = await getUser.execute({ username: github_login });

    const createStudentService = new CreateStudentService();
    const student = await createStudentService.execute({
      github_id,
      github_login,
      avatar_url,
      teacher_id: teacher.id,
      top_language,
    });

    const createRepository = new CreateRepositoryService();
    for (const repository of repositories) {
      await createRepository.execute({
        description: repository.description,
        full_name: repository.full_name,
        github_id: repository.id,
        html_url: repository.html_url,
        name: repository.name,
        student_id: student.id,
      });
    }

    return response.json(student);
  }

  static async show(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      since: yup.string().required('Since date string is required.'),
      until: yup.string(),
    });
    await schema.validate(request.query);

    const { username } = request.params;
    const { since, until } = request.query;

    if (!username) {
      return response.status(400).json({
        message: 'Student Github Login is required.',
      });
    }

    const getUser = new GetUserService();
    const { github_id } = await getUser.execute({
      username,
    });

    const studentsRepository = getRepository(Student);
    const student = await studentsRepository.findOne({
      where: {
        github_id,
      },
    });

    const getPeriodStudentDailyReport = new GetPeriodStudentDailyReportsService();
    const studentDailyReport = await getPeriodStudentDailyReport.execute(
      student.id,
      String(since),
      String(until),
    );

    return response.json(studentDailyReport);
  }

  static async index(request: Request, response: Response): Promise<Response> {
    const studentsRepository = getRepository(Student);

    const students = await studentsRepository.find();

    return response.json(students);
  }
}

export default StudentController;
