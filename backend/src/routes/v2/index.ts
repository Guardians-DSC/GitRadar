import { Router } from 'express';
import manangerRouter from './manager.routes';

const routes = Router();

routes.use('/manager', manangerRouter);

export default routes;
