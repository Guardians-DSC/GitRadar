import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import AppError from '../errors/AppError';
import Student from '../models/Student';
import GetPeriodStudentDailyReportsService from '../services/GetPeriodStudentDailyReportsService';
import GetUserService from '../services/GetUserService';

class DailyReportController {
  static async show(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      since: yup.string().required('Since date string is required.'),
      until: yup.string(),
    });
    await schema.validate(request.query);

    const { username } = request.params;
    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    if (!username) {
      throw new AppError('Github username in params is required.', 400);
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
}

export default DailyReportController;
