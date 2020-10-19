import { Router } from 'express';

import StudentController from '../controllers/StudentController';

const studentRouter = Router();

studentRouter.post('/', StudentController.store);
studentRouter.get('/:username/reports', StudentController.index);

export default studentRouter;
