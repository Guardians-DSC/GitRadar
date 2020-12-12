import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Project from '../../models/Project';
import Spot from '../../models/Spot';

interface Request {
  project_id: string;
}

class GetSpotsOnProjectService {
  async execute({ project_id }: Request): Promise<Spot[]> {
    const projectsRepository = getRepository(Project);

    if (!project_id) throw new AppError('Project id is required.', 400);
    const project = await projectsRepository.findOne({ id: project_id });

    return project.spots;
  }
}

export default GetSpotsOnProjectService;
