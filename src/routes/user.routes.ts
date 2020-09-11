import { Router, Request, Response } from 'express';

import GetProfileService from '../services/GetProfileService';
import GetLanguagesService from '../services/GetLanguagesService';

const userRouter = Router();

userRouter.get('/', async (request: Request, response: Response) => {
  const { username } = request.body;

  if (!username)
    return response
      .status(400)
      .json({ error: 'GitHub username does not provided.' });

  const getProfileService = new GetProfileService();
  const getLanguagesService = new GetLanguagesService();

  const profileInfo = await getProfileService.execute(username);
  const languages = await getLanguagesService.execute(username);

  return response.json({
    ...profileInfo,
    ...languages,
  });
});

userRouter.get('/daily', async (request: Request, response: Response) => {});

export default userRouter;
