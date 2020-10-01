import { getRepository } from 'typeorm';
import Commit from '../models/Commit';

interface Request {
  repository_id: string;
  student_id: string;
  message: string;
  additions: number;
  deletions: number;
}

class CreateCommitService {
  async execute({
    student_id,
    repository_id,
    message,
    additions,
    deletions,
  }: Request): Promise<Commit> {
    const commitsRepository = getRepository(Commit);

    const commit = commitsRepository.create({
      student_id,
      repository_id,
      message,
      additions,
      deletions,
    });
    await commitsRepository.save(commit);

    return commit;
  }
}

export default CreateCommitService;
