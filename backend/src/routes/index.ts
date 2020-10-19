import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import sessionRouter from './session.routes';
import teacherRouter from './teacher.routes';
import studentsRouter from './students.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/teacher', teacherRouter);
routes.use('/session', sessionRouter);

routes.use(authMiddleware);

routes.use('/students', studentsRouter);

export default routes;
