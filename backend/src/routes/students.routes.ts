import { Router } from 'express';

import StudentController from '../controllers/StudentController';

const studentsRouter = Router();

studentsRouter.post('/', StudentController.store);
studentsRouter.get('/', StudentController.index);
studentsRouter.get('/below_average', StudentController.index);
studentsRouter.get('/reports', StudentController.show);
studentsRouter.get('/reports/:username', StudentController.show);

export default studentsRouter;
