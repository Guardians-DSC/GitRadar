import { getCustomRepository } from 'typeorm';
import StudentDailyReportsRepository from '../repositories/StudentDailyReportsRepository';

interface Response {
  new_interactions: number;
  new_forks: number;
  new_stars: number;
  new_repositories: number;
  new_prs: number;
  new_issues: number;
  new_commits: number;
  additions: number;
  deletions: number;
  created_at: string;
}

class GetPeriodStudentDailyReportsService {
  public async execute(since: string, until: string): Promise<Response> {
    const sinceDate = new Date(String(since));
    const untilDate = until ? new Date(String(until)) : new Date();

    const reportsRepository = getCustomRepository(
      StudentDailyReportsRepository,
    );
    const reports = await reportsRepository.findByPeriod(sinceDate, untilDate);

    const finalPeriodReport: Response = {
      additions: 0,
      deletions: 0,
      created_at: new Date().toISOString(),
      new_commits: 0,
      new_forks: 0,
      new_interactions: 0,
      new_issues: 0,
      new_prs: 0,
      new_repositories: 0,
      new_stars: 0,
    };

    reports.forEach(report => {
      finalPeriodReport.additions += report.additions;
      finalPeriodReport.deletions += report.deletions;
      finalPeriodReport.new_commits += report.new_commits;
      finalPeriodReport.new_forks += report.new_forks;
      finalPeriodReport.new_interactions += report.new_interactions;
      finalPeriodReport.new_issues += report.new_issues;
      finalPeriodReport.new_prs += report.new_prs;
      finalPeriodReport.new_repositories += report.new_repositories;
      finalPeriodReport.new_stars += report.new_stars;
    });

    return finalPeriodReport;
  }
}

export default GetPeriodStudentDailyReportsService;
