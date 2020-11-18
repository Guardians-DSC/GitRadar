import { Router } from 'express';

import ClassController from '../controllers/ClassController';

const classRouter = Router();

classRouter.get('/', ClassController.index);
classRouter.get('/below_average', ClassController.index);
classRouter.get('/report', ClassController.show);

export default classRouter;
