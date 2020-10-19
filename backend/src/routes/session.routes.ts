import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionRouter = Router();

sessionRouter.post('/', SessionController.store);

export default sessionRouter;
