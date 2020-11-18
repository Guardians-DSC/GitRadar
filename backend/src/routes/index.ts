import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import sessionRouter from './session.routes';
import teacherRouter from './teacher.routes';
import studentRouter from './student.routes';
import classRouter from './class.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('v1/user', userRouter);
routes.use('v1/teacher', teacherRouter);
routes.use('v1/session', sessionRouter);

routes.use(authMiddleware);

routes.use('v1/student', studentRouter);
routes.use('v1/class', classRouter);

export default routes;
