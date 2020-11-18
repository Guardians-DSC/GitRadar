import { Router } from 'express';
import CreateManagerService from '../../services/Manager/CreateManagerService';

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

export default manangerRouter;
