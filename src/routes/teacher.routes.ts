import { Router } from 'express';
import TeacherController from '../controllers/TeacherController';

const teacherRouter = Router();

teacherRouter.post('/', TeacherController.store);

export default teacherRouter;
