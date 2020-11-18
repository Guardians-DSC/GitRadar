import { Router } from 'express';
import TeacherController from '../../controllers/TeacherController';
import GithubTokenController from '../../controllers/GithubTokenController';

const teacherRouter = Router();

teacherRouter.post('/', TeacherController.store);
teacherRouter.get('/callback', GithubTokenController.store);

export default teacherRouter;
