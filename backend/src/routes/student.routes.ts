import { Router } from 'express';

import StudentController from '../controllers/StudentController';

const studentRouter = Router();

studentRouter.post('/', StudentController.store);
studentRouter.get('/report/:username', StudentController.show);

export default studentRouter;
