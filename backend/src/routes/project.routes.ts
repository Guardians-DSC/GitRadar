import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import CreateProjectService from '../services/Project/CreateProjectService';
import GetBelowAverageOnProjectService from '../services/Project/GetBelowAverageOnProjectService';
import GetProjectReportService from '../services/Project/GetProjectReport';
import GetProjectsService from '../services/Project/GetProjectsService';
import GetProjectService from '../services/Project/GetProjectService';

const projectRouter = Router();

projectRouter.post('/', authMiddleware, async (request, response) => {
  const { name } = request.body;

  const createProject = new CreateProjectService();
  const project = await createProject.execute({ name });

  return response.json(project);
});

projectRouter.get('/', authMiddleware, async (request, response) => {
  const getProjects = new GetProjectsService();

  const projects = await getProjects.execute();
  return response.json(projects);
});

projectRouter.get('/:project_id', authMiddleware, async (request, response) => {
  const { project_id } = request.params;

  const getProjectService = new GetProjectService();
  const project = await getProjectService.execute({ project_id });

  return response.json(project);
});

projectRouter.get(
  '/:project_id/below_average',
  authMiddleware,
  async (request, response) => {
    const getBelowAverageOnProjectService = new GetBelowAverageOnProjectService();

    const { project_id } = request.params;
    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const spots = await getBelowAverageOnProjectService.execute({
      since: since as string,
      until: until as string,
      project_id,
    });

    return response.json(spots);
  },
);

projectRouter.get(
  '/:project_id/report',
  authMiddleware,
  async (request, response) => {
    const getProjectReportService = new GetProjectReportService();

    const { project_id } = request.params;
    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const spots = await getProjectReportService.execute({
      since: since as string,
      until: until as string,
      project_id,
    });

    return response.json(spots);
  },
);

export default projectRouter;
