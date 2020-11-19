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

export default routes;
