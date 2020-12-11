import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import CreateProjectService from '../services/Project/CreateProjectService';
import GetBelowAverageOnProjectService from '../services/Project/GetBelowAverageOnProjectService';
import GetProjectReportService from '../services/Project/GetProjectReport';
import GetSpotsOnProjectService from '../services/Spot/GetSpotsOnProjectService';

const projectRouter = Router();

projectRouter.post('/', authMiddleware, async (request, response) => {
  const { name } = request.body;

  const createProject = new CreateProjectService();
  const project = await createProject.execute({ name });

  return response.json(project);
});

projectRouter.get('/:project', authMiddleware, async (request, response) => {
  const { project } = request.params;

  const getSpotsService = new GetSpotsOnProjectService();
  const spots = await getSpotsService.execute({ project_id: project });

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
