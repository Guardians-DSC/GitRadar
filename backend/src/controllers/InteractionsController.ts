import { Request, Response } from 'express';
import * as yup from 'yup';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import GetInteractionsVolume from '../services/GetInteractionsVolumeService';
import Student from '../models/Student';

class InteractionsController {
  static async index(request: Request, response: Response): Promise<Response> {
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

    const getInteractions = new GetInteractionsVolume();
    const studentRepository = getRepository(Student);

    const { id } = await studentRepository.findOne({
      where: {
        github_login: username,
      },
    });

    const volumeData = await getInteractions.execute({
      since: since.toString(),
      until: until.toString(),
      student_id: id,
    });

    return response.json(volumeData);
  }
}

export default InteractionsController;
