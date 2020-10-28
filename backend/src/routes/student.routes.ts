import { Router } from 'express';

import StudentController from '../controllers/StudentController';
import RepositoryController from '../controllers/RepositoryController';

const studentRouter = Router();

studentRouter.post('/', StudentController.store);
studentRouter.get('/:username/report', StudentController.show);
studentRouter.get('/:username/repositories', RepositoryController.index);

export default studentRouter;
