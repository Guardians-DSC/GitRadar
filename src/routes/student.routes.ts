import { Router } from 'express';

import StudentController from '../controllers/StudentController';

const studentRouter = Router();

studentRouter.post('/', StudentController.store);

export default studentRouter;
