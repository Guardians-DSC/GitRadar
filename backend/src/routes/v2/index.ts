import { Router } from 'express';
import manangerRouter from './manager.routes';
import spotRouter from './spots.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/manager', manangerRouter);
routes.use('/spot', spotRouter);
routes.use('/session', sessionsRouter);

export default routes;
