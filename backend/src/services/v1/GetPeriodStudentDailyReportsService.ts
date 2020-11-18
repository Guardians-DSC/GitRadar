import { getCustomRepository, getRepository } from 'typeorm';
import StudentDailyReportsRepository from '../repositories/StudentDailyReportsRepository';
import Commit from '../models/Commit';

interface CommitResponse {
  repository?: {
    name: string;
    url: string;
  };
  sha: string;
  message: string;
  additions: number;
  deletions: number;
}

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
  commits: CommitResponse[];
}

class GetPeriodStudentDailyReportsService {
  public async execute(
    student_id: string,
    since: string,
    until: string,
  ): Promise<Response> {
    const sinceDate = new Date(since);
    const untilDate = new Date(until);

    const reportsRepository = getCustomRepository(
      StudentDailyReportsRepository,
    );
    const commitRepository = getRepository(Commit);

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
      commits: [],
    };

    const reports = await reportsRepository.findByPeriod(
      student_id,
      sinceDate,
      untilDate,
    );

    for (const report of reports) {
      finalPeriodReport.additions += report.additions;
      finalPeriodReport.deletions += report.deletions;
      finalPeriodReport.new_commits += report.new_commits;
      finalPeriodReport.new_forks += report.new_forks;
      finalPeriodReport.new_interactions += report.new_interactions;
      finalPeriodReport.new_issues += report.new_issues;
      finalPeriodReport.new_prs += report.new_prs;
      finalPeriodReport.new_repositories += report.new_repositories;
      finalPeriodReport.new_stars += report.new_stars;

      const commits = await commitRepository.find({
        student_daily_report_id: report.id,
      });

      const commitsResponse: CommitResponse[] = commits.map(commit => {
        const response: CommitResponse = {
          sha: commit.sha,
          additions: commit.additions,
          deletions: commit.deletions,
          message: commit.message,
        };

        if (commit.repository) {
          response.repository = {
            name: commit.repository.name,
            url: commit.repository.html_url,
          };
        }

        return response;
      });

      finalPeriodReport.commits = [
        ...finalPeriodReport.commits,
        ...commitsResponse,
      ];
    }

    return finalPeriodReport;
  }
}

export default GetPeriodStudentDailyReportsService;
