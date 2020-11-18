import { Router } from 'express';
import CreateSpotService from '../../services/Spot/CreateSpotService';
import authMiddleware from '../../middlewares/authMiddleware';
import GetSpotsService from '../../services/Spot/GetSpotsService';

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

spotRouter.get('/', authMiddleware, async (request, response) => {
  const getSpotsService = new GetSpotsService();

  const spots = await getSpotsService.execute();

  return response.json(spots);
});

export default spotRouter;
