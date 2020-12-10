import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Project from '../../models/Project';

interface Request {
  name: string;
}

class CreateProjectService {
  async execute({ name }: Request): Promise<Project> {
    const projectsRepository = getRepository(Project);

    if (!name) throw new AppError('Project name is required!', 400);

    const project = projectsRepository.create({ name });
    await projectsRepository.save(project);

    return project;
  }
}

export default CreateProjectService;
