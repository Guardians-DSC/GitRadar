import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Project from '../../models/Project';
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
  project_id: string;
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
  async execute({ since, until, project_id }: Request): Promise<Response> {
    const projectsRepository = getRepository(Project);
    const reportsRepository = getCustomRepository(SpotDailyReportsRepository);

    if (!project_id) {
      throw new AppError('Project id is required.');
    }

    const project = await projectsRepository.findOne(
      { id: project_id },
      { relations: ['spots'] },
    );
    if (!project) {
      throw new AppError('Project does not exist.');
    }

    let reports = await reportsRepository.findByPeriod(since, until);
    reports = reports.filter(({ spot }) =>
      project.spots.find(current => current.id === spot.id),
    );

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
