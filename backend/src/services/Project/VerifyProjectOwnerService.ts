import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Manager from '../../models/Manager';

interface Request {
  manager_id: string;
  project_id: string;
}

class VerifyProjectOwnerService {
  async execute({ manager_id, project_id }: Request): Promise<void> {
    const managersRepository = getRepository(Manager);

    if (!manager_id) {
      throw new AppError('Manager id is required.');
    }

    if (!project_id) {
      throw new AppError('Project id is required.');
    }

    const manager = await managersRepository.findOne(
      { id: manager_id },
      { relations: ['projects'] },
    );

    const projectFound = manager.projects.find(
      project => project.id === project_id,
    );

    if (!projectFound) {
      throw new AppError(
        'the project does not exist or does not belong to the manager.',
      );
    }
  }
}

export default VerifyProjectOwnerService;
