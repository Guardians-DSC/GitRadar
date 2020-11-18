import { Router } from 'express';
import manangerRouter from './manager.routes';
import spotRouter from './spots.routes';

const routes = Router();

routes.use('/manager', manangerRouter);
routes.use('/spot', spotRouter);

export default routes;
