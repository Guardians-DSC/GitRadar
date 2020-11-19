import { getCustomRepository } from 'typeorm';
import SpotDailyReportsRepository from '../../repositories/SpotDailyReportsRepository';

interface Request {
  since: Date;
  until: Date;
}

interface Spot {
  id: string;
  github_login: string;
  manager_id: string;
  avatar_url: string;
  top_language: string;
  github_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

class GetBelowAverageOnProjectService {
  public async execute({ since, until }: Request): Promise<Spot[]> {
    const dailyReportRepository = getCustomRepository(
      SpotDailyReportsRepository,
    );

    const reports = await dailyReportRepository.findByPeriod(since, until);

    const total = Object.values(reports).reduce(
      (interactions, { metrics }) => interactions + metrics.new_interactions,
      0,
    );

    const average = total / reports.length;

    const spotsBelowAverage = reports
      .filter(({ metrics }) => metrics.new_interactions < average)
      .map(({ spot }) => spot);

    return spotsBelowAverage;
  }
}

export default GetBelowAverageOnProjectService;
