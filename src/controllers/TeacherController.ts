import { Request, Response } from 'express';
import * as yup from 'yup';

import GetUserService from '../services/GetUserService';
import CreateTeacherService from '../services/CreateTeacherService';

class TeacherController {
  static async store(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      github_login: yup.string().required('Github Login is required.'),
      email: yup.string().required('E-mail is required.'),
      password: yup.string().required('Password is required.'),
    });

    await schema.validate(request.body);

    const { github_login, email, password } = request.body;

    const getUser = new GetUserService();
    const { github_id } = await getUser.execute({ username: github_login });

    const createTeacher = new CreateTeacherService();
    const teacher = await createTeacher.execute({
      github_id,
      email,
      github_login,
      password,
    });

    delete teacher.password;

    return response.json(teacher);
  }
}

export default TeacherController;
