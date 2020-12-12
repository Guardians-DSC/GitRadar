import { Router } from 'express';
import CreateSpotService from '../../services/Spot/CreateSpotService';
import authMiddleware from '../../middlewares/authMiddleware';
import GetSpotReportService from '../../services/Spot/GetSpotReportService';
import GetSpotRepositories from '../../services/Spot/GetSpotRepositories';
import spotVolumeRouter from './volume/spots.volume.routes';

const spotRouter = Router();

spotRouter.use('/volume', spotVolumeRouter);

spotRouter.post('/', authMiddleware, async (request, response) => {
  const { github_login, project_id } = request.body;
  const { id } = request.manager;

  const createSpotService = new CreateSpotService();

  const spot = await createSpotService.execute({
    manager_id: id,
    spot_github_login: github_login,
    project_id,
  });

  return response.json(spot);
});

spotRouter.get('/:github_login/report', async (request, response) => {
  const { github_login } = request.params;

  let { until } = request.query;
  until = until || new Date().toISOString();
  const { since } = request.query;

  const getSpotReportService = new GetSpotReportService();

  const spotReport = await getSpotReportService.execute({
    since: since as string,
    github_login,
    until: until as string,
  });

  return response.json(spotReport);
});

spotRouter.get('/:github_login/repositories', async (request, response) => {
  const { github_login } = request.params;

  const getSpotRepositories = new GetSpotRepositories();

  const repositories = await getSpotRepositories.execute({ github_login });

  return response.json(repositories);
});

export default spotRouter;
