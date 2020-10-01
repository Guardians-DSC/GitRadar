import { Request, Response } from 'express';
import * as yup from 'yup';

import GetProfileService from '../services/GetProfileService';
import GetLanguagesService from '../services/GetLanguagesService';
import CreateStudentService from '../services/CreateStudentService';

class StudentController {
  static async store(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      github_login: yup.string().required('Student github_login is required.'),
    });

    await schema.validate(request.body);

    const { github_login } = request.body;
    const { teacher } = request;

    const getProfileService = new GetProfileService();
    const { avatar_url } = await getProfileService.execute(github_login);

    const getLanguagesService = new GetLanguagesService();
    const { top_language } = await getLanguagesService.execute(github_login);

    const createStudentService = new CreateStudentService();
    const student = await createStudentService.execute({
      github_login,
      avatar_url,
      teacher_id: teacher.id,
      top_language,
    });

    return response.json(student);
  }
}

export default StudentController;
