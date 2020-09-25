import { Router } from 'express';

import teacherRouter from './teacher.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/teacher', teacherRouter);
routes.use('/user', userRouter);

export default routes;
