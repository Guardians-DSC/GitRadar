import { Router } from 'express';
import CreateSpotService from '../../services/Spot/CreateSpotService';
import authMiddleware from '../../middlewares/authMiddleware';

const spotRouter = Router();

spotRouter.post('/', authMiddleware, async (request, response) => {
  const { github_login } = request.body;
  const { id } = request.manager;

  const createSpotService = new CreateSpotService();

  const spot = await createSpotService.execute({
    manager_id: id,
    spot_github_login: github_login,
  });

  return response.json(spot);
});

export default spotRouter;
