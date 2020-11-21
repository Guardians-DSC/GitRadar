import { Router } from 'express';
import CreateManagerService from '../services/Manager/CreateManagerService';
import SetGithubTokenService from '../services/Manager/SetGithubTokenService';

const manangerRouter = Router();

manangerRouter.post('/', async (request, response) => {
  const { github_login, email, password } = request.body;

  const createManagerService = new CreateManagerService();

  const manager = await createManagerService.execute({
    github_login,
    email,
    password,
  });

  return response.json(manager);
});

manangerRouter.get('/callback', async (request, response) => {
  const { code } = request.query;

  const setGithubTokenService = new SetGithubTokenService();

  await setGithubTokenService.execute({ code: code as string });

  return response.json({ message: 'Github Token registered.' });
});

export default manangerRouter;
