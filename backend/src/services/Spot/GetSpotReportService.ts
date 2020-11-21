import { Between, getCustomRepository, getRepository } from 'typeorm';
import SpotDailyReportsRepository from '../../repositories/SpotDailyReportsRepository';
import Commit from '../../models/Commit';
import Spot from '../../models/Spot';
import AppError from '../../errors/AppError';

interface Request {
  github_login: string;
  since: string;
  until: string;
}

interface Response {
  spot: {
    id: string;
    github_login: string;
    manager_id: string;
    avatar_url: string;
    top_language: string;
    github_id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
  metrics: {
    new_interactions: number;
    new_commits: number;
    new_prs: number;
    new_issues: number;
    new_prs_review: number;
    new_repositories: number;
    additions: number;
    deletions: number;
  };
  commits: Commit[];
}

class GetSpotReportService {
  async execute({ github_login, since, until }: Request): Promise<Response> {
    const reportsRepository = getCustomRepository(SpotDailyReportsRepository);
    const commitRepository = getRepository(Commit);
    const spotRepository = getRepository(Spot);

    const spot = await spotRepository.findOne({
      where: {
        github_login,
      },
      loadEagerRelations: false,
    });

    if (!spot) {
      throw new AppError('Spot not registered', 400);
    }

    const { id } = spot;

    const { metrics } = await reportsRepository.findByPeriodAndId(
      id,
      since,
      until,
    );
    const commits = await commitRepository.find({
      where: {
        id,
        created_at: Between(since, until),
      },
    });

    return { spot: { ...spot }, metrics: { ...metrics }, commits };
  }
}

export default GetSpotReportService;
