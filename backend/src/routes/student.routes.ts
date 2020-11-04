import { Router } from 'express';

import StudentController from '../controllers/StudentController';
import DailyReportController from '../controllers/DailyReportController';
import InteractionsController from '../controllers/InteractionsController';

const studentRouter = Router();

studentRouter.post('/', StudentController.store);
studentRouter.get('/:username', StudentController.show);
studentRouter.get(
  '/:username/interactions/volume',
  InteractionsController.index,
);
studentRouter.get('/:username/report', DailyReportController.show);

export default studentRouter;
