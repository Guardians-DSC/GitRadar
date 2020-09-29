import { Request, Response } from 'express';
import RegisterTeacherGithubService from '../services/RegisterTeacherGithubService';

class GithubTokenController {
  static async store(request: Request, response: Response): Promise<Response> {
    const { code } = request.query;

    if (!code) {
      return response.status(401).json({
        message: 'Not able to get github login code.',
      });
    }

    const registerTeacherGithub = new RegisterTeacherGithubService();
    await registerTeacherGithub.execute(code as string);

    return response.json({ message: 'Github Token registered.' });
  }
}

export default GithubTokenController;
