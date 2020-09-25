import { Request, Response } from 'express';
import * as yup from 'yup';

import CreateTeacherService from '../services/CreateTeacherService';

class TeacherController {
  static async store(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      email: yup.string().required('E-mail is required.'),
      password: yup.string().required('Password is required.'),
    });

    try {
      await schema.validate(request.body);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    const { email, password } = request.body;
    const createTeacher = new CreateTeacherService();

    const teacher = await createTeacher.execute(email, password);

    return response.json(teacher);
  }
}

export default TeacherController;