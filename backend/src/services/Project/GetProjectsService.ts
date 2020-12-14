import { getRepository } from 'typeorm';
import Manager from '../../models/Manager';
import Project from '../../models/Project';

interface Request {
  manager_id: string;
}
class GetProjectsService {
  async execute({ manager_id }: Request): Promise<Project[]> {
    const managersRepository = getRepository(Manager);

    const manager = await managersRepository.findOne(
      { id: manager_id },
      { relations: ['projects'] },
    );

    return manager.projects;
  }
}

export default GetProjectsService;
