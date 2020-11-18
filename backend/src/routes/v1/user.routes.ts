import { Router, Request, Response } from 'express';

import GetProfileService from '../../services/v1/GetProfileService';
import GetLanguagesService from '../../services/v1/GetLanguagesService';
import GetUserDailyReportService from '../../services/v1/GetUserDailyReportService';

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

userRouter.get(
  '/daily/:username',
  async (request: Request, response: Response) => {
    const { username } = request.params;

    if (!username)
      return response
        .status(400)
        .json({ error: 'GitHub username does not provided.' });

    const getUserDailyReportService = new GetUserDailyReportService();

    const dailyInfo = await getUserDailyReportService.execute(username);

    return response.json({
      ...dailyInfo,
    });
  },
);

export default userRouter;
