import axios from 'axios';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { encrypt } from '../../utils/crypto';
import Manager from '../../models/Manager';

interface Request {
  code: string;
}

class SetGithubTokenService {
  async execute({ code }: Request): Promise<void> {
    const clientId = process.env.GITHUB_APP_CLIENT_ID;
    const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
    const managersRepository = getRepository(Manager);

    if (!clientId || !clientSecret) {
      throw new AppError('Internal server error.', 500);
    }

    let tokenRequest;
    try {
      tokenRequest = await axios.post(
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
    } catch (error) {
      throw new AppError('Not able to get github access token.', 401);
    }

    const accessToken = tokenRequest.data.access_token;
    if (!accessToken) {
      throw new AppError('Not able to get github access token.', 401);
    }

    let response;
    try {
      response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
    } catch (error) {
      throw new AppError('Unable to get user information on GitHub api.', 500);
    }
    const { login } = response.data;

    const encryptedToken = encrypt(accessToken);

    const manager = await managersRepository.findOne({
      github_login: login,
    });

    manager.github_token = encryptedToken;

    await managersRepository.save(manager);
  }
}

export default SetGithubTokenService;
