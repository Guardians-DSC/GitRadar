import { Router, Request, Response } from 'express';

import GetProfileService from '../services/GetProfileService';
import GetLanguagesService from '../services/GetLanguagesService';
import GetUserDailyService from '../services/GetUserDailyService';

const userRouter = Router();

userRouter.get('/:username', async (request: Request, response: Response) => {
  const { username } = request.params;

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

userRouter.get('/daily/:username', async (request: Request, response: Response) => {
  const { username } = request.params;

  if (!username)
    return response
      .status(400)
      .json({ error: 'GitHub username does not provided.' });

  const getUserDailyService = new GetUserDailyService();

  const dailyInfo = await getUserDailyService.execute(username);

  return response.json({
    ...dailyInfo,
  });
});

export default userRouter;
