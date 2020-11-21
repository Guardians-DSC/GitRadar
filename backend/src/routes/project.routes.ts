import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import GetBelowAverageOnProjectService from '../services/Project/GetBelowAverageOnProjectService';
import GetProjectReportService from '../services/Project/GetProjectReport';
import GetSpotsOnProjectService from '../services/Spot/GetSpotsOnProjectService';

const projectRouter = Router();

projectRouter.get('/:project', authMiddleware, async (request, response) => {
  const getSpotsService = new GetSpotsOnProjectService();

  const spots = await getSpotsService.execute();

  return response.json(spots);
});

projectRouter.get(
  '/:project/below_average',
  authMiddleware,
  async (request, response) => {
    const getBelowAverageOnProjectService = new GetBelowAverageOnProjectService();

    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const spots = await getBelowAverageOnProjectService.execute({
      since: since as string,
      until: until as string,
    });

    return response.json(spots);
  },
);

projectRouter.get(
  '/:project/report',
  authMiddleware,
  async (request, response) => {
    const getProjectReportService = new GetProjectReportService();

    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const spots = await getProjectReportService.execute({
      since: since as string,
      until: until as string,
    });

    return response.json(spots);
  },
);

export default projectRouter;
