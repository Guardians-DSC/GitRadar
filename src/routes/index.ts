import { Router } from 'express';

import sessionRouter from './session.routes';
import teacherRouter from './teacher.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/teacher', teacherRouter);
routes.use('/user', userRouter);

export default routes;
