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
    const { avatar_url, name } = await getUser.execute(github_login);

    const createTeacher = new CreateTeacherService();
    const teacher = await createTeacher.execute({
      avatar_url,
      email,
      github_login,
      name,
      password,
    });

    delete teacher.password;

    return response.json(teacher);
  }
}

export default TeacherController;
