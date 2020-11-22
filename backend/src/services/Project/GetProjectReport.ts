import { getCustomRepository } from 'typeorm';
import SpotDailyReportsRepository from '../../repositories/SpotDailyReportsRepository';

interface Response {
  all_new_interactions: number;
  all_new_commits: number;
  new_interactions_average: number;
  new_commits_average: number;
}

interface Request {
  since: string;
  until: string;
}

interface Report {
  metrics: {
    new_interactions: number;
    new_commits: number;
    new_prs: number;
    new_issues: number;
    new_repositories: number;
    additions: number;
    deletions: number;
  };
}

class GetProjectReportService {
  async execute({ since, until }: Request): Promise<Response> {
    const reportsRepository = getCustomRepository(SpotDailyReportsRepository);

    const reports = await reportsRepository.findByPeriod(since, until);

    const projectReports = this.parseProjectReport(reports);

    return projectReports;
  }

  private parseProjectReport(reports: Report[]): Response {
    const projectReports = {
      all_new_interactions: 0,
      all_new_commits: 0,
      new_interactions_average: 0,
      new_commits_average: 0,
    };

    reports.forEach(({ metrics }) => {
      projectReports.all_new_commits += metrics.new_commits;
      projectReports.all_new_interactions += metrics.new_interactions;
    });

    const spots = reports.length;

    projectReports.new_commits_average =
      projectReports.all_new_commits / spots || 0;
    projectReports.new_interactions_average =
      projectReports.all_new_interactions / spots || 0;

    return projectReports;
  }
}

export default GetProjectReportService;
