import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Project from '../../models/Project';

interface Request {
  project_id: string;
}

class GetProjectService {
  async execute({ project_id }: Request): Promise<Project> {
    const projectsRepository = getRepository(Project);

    if (!project_id) {
      throw new AppError('Project id is required.', 400);
    }

    const project = await projectsRepository.findOne(
      {
        id: project_id,
      },
      { relations: ['spots'] },
    );

    if (!project) {
      throw new AppError('Project does not exist.', 400);
    }

    project.spots = project.spots.map(spot => {
      delete spot.manager;
      return spot;
    });

    return project;
  }
}

export default GetProjectService;
