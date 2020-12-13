import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Project from '../../models/Project';
import SpotDailyReportsRepository from '../../repositories/SpotDailyReportsRepository';

interface Request {
  since: string;
  until: string;
  project_id: string;
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
  public async execute({ since, until, project_id }: Request): Promise<Spot[]> {
    const projectsRepository = getRepository(Project);
    const dailyReportRepository = getCustomRepository(
      SpotDailyReportsRepository,
    );

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

    let reports = await dailyReportRepository.findByPeriod(since, until);
    reports = reports.filter(({ spot }) =>
      project.spots.find(current => current.id === spot.id),
    );

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
