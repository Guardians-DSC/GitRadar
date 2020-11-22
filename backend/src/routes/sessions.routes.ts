import { Router } from 'express';
import AuthenticateManagerService from '../services/Manager/AuthenticateManagerService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateManagerService();

  const { manager, token, hasGithubToken } = await authenticateUser.execute({
    email,
    password,
  });

  delete manager.password;

  return response.json({ manager, token, hasGithubToken });
});

export default sessionsRouter;
