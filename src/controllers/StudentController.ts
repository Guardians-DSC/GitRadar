import { Request, Response } from 'express';
import * as yup from 'yup';

import GetUserService from '../services/GetUserService';
import GetProfileService from '../services/GetProfileService';
import GetLanguagesService from '../services/GetLanguagesService';
import CreateStudentService from '../services/CreateStudentService';
import GetPeriodStudentDailyReportsService from '../services/GetPeriodStudentDailyReportsService';

class StudentController {
  static async store(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      github_login: yup.string().required('Student github_login is required.'),
    });

    await schema.validate(request.body);

    const { github_login } = request.body;
    const { teacher } = request;

    const getProfile = new GetProfileService();
    const { avatar_url } = await getProfile.execute(github_login);

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

    return response.json(student);
  }

  static async show(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      since: yup.string().required('Since date string is required.'),
      until: yup.string(),
    });
    await schema.validate(request.query);

    const { since, until } = request.query;

    const getPeriodStudentDailyReport = new GetPeriodStudentDailyReportsService();
    const studentDailyReport = await getPeriodStudentDailyReport.execute(
      String(since),
      String(until),
    );

    return response.json(studentDailyReport);
  }
}

export default StudentController;
