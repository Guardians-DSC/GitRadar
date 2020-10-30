import { Router } from 'express';

import StudentController from '../controllers/StudentController';
import DailyReportController from '../controllers/DailyReportController';

const studentRouter = Router();

studentRouter.post('/', StudentController.store);
studentRouter.get('/:username', StudentController.show);
studentRouter.get('/:username/report', DailyReportController.show);

export default studentRouter;
