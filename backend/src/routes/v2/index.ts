import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import manangerRouter from './manager.routes';
import spotRouter from './spots.routes';
import sessionsRouter from './sessions.routes';
import SpotDailyReportsRepository from '../../repositories/SpotDailyReportsRepository';

const routes = Router();

routes.use('/manager', manangerRouter);
routes.use('/spot', spotRouter);
routes.use('/session', sessionsRouter);
routes.get('/test', async (request, response) => {
  const spotDailyReportsRepository = getCustomRepository(
    SpotDailyReportsRepository,
  );

  const since = new Date();

  since.setMonth(since.getMonth() - 1);

  const data = await spotDailyReportsRepository.findByPeriod(
    'af733d6f-c198-41ac-9299-f6524a7108d9',
    since,
    new Date(),
  );

  return response.json(data);
});

export default routes;
