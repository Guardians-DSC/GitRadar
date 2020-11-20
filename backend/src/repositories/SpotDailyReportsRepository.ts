import { EntityRepository, Repository } from 'typeorm';

import SpotDailyReport from '../models/SpotDailyReport';

interface RawReport {
  spot_id: string;
  spot_manager_id: string;
  spot_github_login: string;
  spot_avatar_url: string;
  spot_top_language: string;
  spot_github_id: string;
  spot_name: string;
  spot_created_at: string;
  spot_updated_at: string;
  new_interactions: number;
  new_commits: number;
  new_prs: number;
  new_issues: number;
  new_repositories: number;
  additions: number;
  deletions: number;
}

interface Report {
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
}

@EntityRepository(SpotDailyReport)
class SpotDailyReportsRepository extends Repository<SpotDailyReport> {
  public async findByPeriodAndId(
    spot_id: string,
    since: string,
    until: string,
  ): Promise<Report | null> {
    const rawReport: RawReport = await this.createQueryBuilder('report')
      .where('report.spot_id = :id', { id: spot_id })
      .leftJoinAndSelect('report.spot', 'spot')
      .andWhere(`report.created_at >= :since`, { since })
      .andWhere('report.created_at < :until', { until })
      .select('spot')
      .addSelect('SUM(report.new_interactions)', 'new_interactions')
      .addSelect('SUM(report.new_commits)', 'new_commits')
      .addSelect('SUM(report.new_prs)', 'new_prs')
      .addSelect('SUM(report.new_issues)', 'new_issues')
      .addSelect('SUM(report.new_repositories)', 'new_repositories')
      .addSelect('SUM(report.additions)', 'additions')
      .addSelect('SUM(report.deletions)', 'deletions')
      .groupBy('spot.id')
      .getRawOne();

    const report = this.parseRawReport(rawReport);

    return report;
  }

  public async findByPeriod(
    since: string,
    until: string,
  ): Promise<Report[] | null> {
    const rawReport: RawReport[] = await this.createQueryBuilder('report')
      .leftJoinAndSelect('report.spot', 'spot')
      .andWhere(`report.created_at >= :since`, { since })
      .andWhere('report.created_at < :until', { until })
      .select('spot')
      .addSelect('SUM(report.new_interactions)', 'new_interactions')
      .addSelect('SUM(report.new_commits)', 'new_commits')
      .addSelect('SUM(report.new_prs)', 'new_prs')
      .addSelect('SUM(report.new_issues)', 'new_issues')
      .addSelect('SUM(report.new_repositories)', 'new_repositories')
      .addSelect('SUM(report.additions)', 'additions')
      .addSelect('SUM(report.deletions)', 'deletions')
      .groupBy('spot.id')
      .getRawMany();

    const report = rawReport.map(raw => this.parseRawReport(raw));

    return report;
  }

  private parseRawReport(rawReport: RawReport): Report {
    const {
      additions,
      deletions,
      new_commits,
      new_interactions,
      new_issues,
      new_prs,
      new_repositories,
      spot_github_login,
      spot_id,
      spot_name,
      spot_avatar_url,
      spot_top_language,
      spot_created_at,
      spot_github_id,
      spot_manager_id,
      spot_updated_at,
    } = rawReport;

    const report: Report = {
      spot: {
        id: spot_id,
        github_login: spot_github_login,
        name: spot_name,
        avatar_url: spot_avatar_url,
        top_language: spot_top_language,
        github_id: spot_github_id,
        manager_id: spot_manager_id,
        created_at: spot_created_at,
        updated_at: spot_updated_at,
      },
      metrics: {
        additions: Number(additions),
        deletions: Number(deletions),
        new_commits: Number(new_commits),
        new_interactions: Number(new_interactions),
        new_issues: Number(new_issues),
        new_prs: Number(new_prs),
        new_repositories: Number(new_repositories),
      },
    };
    return report;
  }
}

export default SpotDailyReportsRepository;
