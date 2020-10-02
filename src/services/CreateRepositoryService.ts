import { getRepository } from 'typeorm';
import Repository from '../models/Repository';

interface Request {
  student_id: string;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
}

class CreateRepositoryService {
  async execute({
    student_id,
    name,
    full_name,
    description,
    html_url,
  }: Request): Promise<Repository> {
    const repositoriesRepository = getRepository(Repository);

    const repository = repositoriesRepository.create({
      student_id,
      name,
      full_name,
      description,
      html_url,
    });
    await repositoriesRepository.save(repository);

    return repository;
  }
}

export default CreateRepositoryService;
