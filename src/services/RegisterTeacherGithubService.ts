import axios from 'axios';
import AppError from '../errors/AppError';
import EditTeacherService from './EditTeacherService';

class RegisterTeacherGithubService {
  async execute(code: string): Promise<void> {
    const clientId = process.env.GITHUB_APP_CLIENT_ID;
    const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new AppError('Internal server error.', 500);
    }

    const tokenRequest = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const accesToken = tokenRequest.data.access_token;
    if (!accesToken) {
      throw new AppError('Not able to get github acess token.', 401);
    }

    let response;
    try {
      response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accesToken}`,
        },
      });
    } catch (error) {
      throw new AppError('Unable to get user information on GitHub api.', 500);
    }
    const { name, email, avatar_url } = response.data;

    const editTeacher = new EditTeacherService();
    await editTeacher.execute(email, {
      name,
      avatar_url,
      github_token: accesToken,
    });
  }
}

export default RegisterTeacherGithubService;
