import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import CreateProjectService from '../services/Project/CreateProjectService';
import GetBelowAverageOnProjectService from '../services/Project/GetBelowAverageOnProjectService';
import GetProjectReportService from '../services/Project/GetProjectReport';
import GetProjectsService from '../services/Project/GetProjectsService';
import GetProjectService from '../services/Project/GetProjectService';
import VerifyProjectOwnerService from '../services/Project/VerifyProjectOwnerService';

const projectRouter = Router();

projectRouter.post('/', authMiddleware, async (request, response) => {
  const { name } = request.body;
  const { id: manager_id } = request.manager;

  const createProject = new CreateProjectService();
  const project = await createProject.execute({ name, manager_id });

  return response.json(project);
});

projectRouter.get('/', authMiddleware, async (request, response) => {
  const { id: manager_id } = request.manager;

  const getProjects = new GetProjectsService();
  const projects = await getProjects.execute({ manager_id });

  return response.json(projects);
});

projectRouter.get('/:project_id', authMiddleware, async (request, response) => {
  const { project_id } = request.params;
  const { id: manager_id } = request.manager;

  const verifyProjectOwner = new VerifyProjectOwnerService();
  await verifyProjectOwner.execute({ manager_id, project_id });

  const getProjectService = new GetProjectService();
  const project = await getProjectService.execute({ project_id });

  return response.json(project);
});

projectRouter.get(
  '/:project_id/below_average',
  authMiddleware,
  async (request, response) => {
    const { project_id } = request.params;

    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const { id: manager_id } = request.manager;

    const verifyProjectOwner = new VerifyProjectOwnerService();
    await verifyProjectOwner.execute({ manager_id, project_id });

    const getBelowAverageOnProjectService = new GetBelowAverageOnProjectService();
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

    const { id: manager_id } = request.manager;

    const verifyProjectOwner = new VerifyProjectOwnerService();
    await verifyProjectOwner.execute({ manager_id, project_id });

    const spots = await getProjectReportService.execute({
      since: since as string,
      until: until as string,
      project_id,
    });

    return response.json(spots);
  },
);

export default projectRouter;
