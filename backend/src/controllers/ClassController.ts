import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import Student from '../models/Student';
import GetClassReport from '../services/GetClassReport';
import GetPeriodStudentDailyReportsService from '../services/GetPeriodStudentDailyReportsService';

class ClassController {
  static async index(request: Request, response: Response): Promise<Response> {
    const studentsRepository = getRepository(Student);
    const students = await studentsRepository.find();

    if (request.path === '/below_average') {
      const schema = yup.object().shape({
        since: yup.string().required('Since date string is required.'),
        until: yup.string(),
      });
      await schema.validate(request.query);

      let { until } = request.query;
      until = until || new Date().toISOString();
      const { since } = request.query;

      const getClassReport = new GetClassReport();
      const classInformation = await getClassReport.execute(
        String(since),
        String(until),
      );

      const belowAverageStudents: Student[] = [];

      for (const student of students) {
        const getPeriodStudentDailyReport = new GetPeriodStudentDailyReportsService();
        const studentDailyReport = await getPeriodStudentDailyReport.execute(
          student.id,
          String(since),
          String(until),
        );

        if (
          studentDailyReport.new_interactions <
          classInformation.new_interactions_average
        ) {
          belowAverageStudents.push(student);
        }
      }

      return response.json(belowAverageStudents);
    }

    return response.json(students);
  }

  static async show(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      since: yup.string().required('Since date string is required.'),
      until: yup.string(),
    });
    await schema.validate(request.query);

    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const getClassReport = new GetClassReport();
    const classInformation = await getClassReport.execute(
      String(since),
      String(until),
    );
    return response.json(classInformation);
  }
}

export default ClassController;
