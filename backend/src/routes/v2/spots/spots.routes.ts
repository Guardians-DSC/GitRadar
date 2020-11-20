import { Router } from 'express';
import CreateSpotService from '../../../services/Spot/CreateSpotService';
import authMiddleware from '../../../middlewares/authMiddleware';
import GetSpotReportService from '../../../services/Spot/GetSpotReportService';
import spotVolumeRouter from './volume/spots.volume.routes';

const spotRouter = Router();

spotRouter.use('/volume', spotVolumeRouter);

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

spotRouter.get(
  '/:spot_id/report',
  authMiddleware,
  async (request, response) => {
    const { spot_id } = request.params;

    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const getSpotReportService = new GetSpotReportService();

    const spotReport = await getSpotReportService.execute({
      since: since as string,
      spot_id,
      until: until as string,
    });

    return response.json(spotReport);
  },
);

export default spotRouter;
