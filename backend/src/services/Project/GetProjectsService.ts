import { getRepository } from 'typeorm';
import Project from '../../models/Project';

class GetProjectsService {
  async execute(): Promise<Project[]> {
    const projectsRepository = getRepository(Project);

    const projects = await projectsRepository.find();

    return projects;
  }
}

export default GetProjectsService;
