import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Manager from '../../models/Manager';
import Project from '../../models/Project';

interface Request {
  name: string;
  manager_id: string;
}

class CreateProjectService {
  async execute({ name, manager_id }: Request): Promise<Project> {
    const projectsRepository = getRepository(Project);
    const managersRepository = getRepository(Manager);

    if (!name) throw new AppError('Project name is required!');

    const manager = await managersRepository.findOne(
      { id: manager_id },
      {
        relations: ['projects'],
      },
    );

    if (manager.projects.length === manager.projects_limit) {
      throw new AppError('the manager projects limit has been reached.');
    }

    const project = projectsRepository.create({ name });
    await projectsRepository.save(project);

    manager.projects.push(project);
    await managersRepository.save(manager);

    return project;
  }
}

export default CreateProjectService;
