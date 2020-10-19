import { Router } from 'express';

import StudentController from '../controllers/StudentController';

const studentsRouter = Router();

studentsRouter.post('/', StudentController.store);
studentsRouter.get('/', StudentController.index);
studentsRouter.get('/:username/reports', StudentController.show);

export default studentsRouter;
