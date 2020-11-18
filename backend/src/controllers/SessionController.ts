import { Request, Response } from 'express';
import * as yup from 'yup';

import AuthenticateTeacherService from '../services/v1/AuthenticateTeacherService';

class SessionController {
  static async store(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      email: yup.string().required('E-mail is required.'),
      password: yup.string().required('Password is required.'),
    });

    await schema.validate(request.body);

    const { email, password } = request.body;

    const authenticateTeacher = new AuthenticateTeacherService();
    const { teacher, token } = await authenticateTeacher.execute(
      email,
      password,
    );

    delete teacher.password;
    const hasGithubToken = !!teacher.github_token;
    delete teacher.github_token;

    return response.json({ teacher, token, hasGithubToken });
  }
}

export default SessionController;
