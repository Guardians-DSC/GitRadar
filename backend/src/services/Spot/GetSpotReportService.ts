import { Between, getCustomRepository, getRepository } from 'typeorm';
import SpotDailyReportsRepository from '../../repositories/SpotDailyReportsRepository';
import Commit from '../../models/Commit';

interface Request {
  spot_id: string;
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
    created_at: string;
    updated_at: string;
  };
  metrics: {
    new_interactions: number;
    new_commits: number;
    new_prs: number;
    new_issues: number;
    new_repositories: number;
    additions: number;
    deletions: number;
  };
  commits: Commit[];
}

class GetSpotReportService {
  async execute({ spot_id, since, until }: Request): Promise<Response> {
    const reportsRepository = getCustomRepository(SpotDailyReportsRepository);
    const commitRepository = getRepository(Commit);

    const spotReport = await reportsRepository.findByPeriodAndId(
      spot_id,
      since,
      until,
    );

    const commits = await commitRepository.find({
      where: {
        spot_id,
        created_at: Between(since, until),
      },
    });

    console.log(spot_id);

    console.log(spotReport);

    return { ...spotReport, commits };
  }
}

export default GetSpotReportService;
