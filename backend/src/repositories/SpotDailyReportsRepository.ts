import { EntityRepository, Repository } from 'typeorm';

import SpotDailyReport from '../models/SpotDailyReport';

interface RawReport {
  new_interactions: number;
  new_commits: number;
  new_prs: number;
  new_issues: number;
  new_repositories: number;
  additions: number;
  deletions: number;
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
      .andWhere(`report.taken_at >= :since`, { since })
      .andWhere('report.taken_at <= :until', { until })
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
      .andWhere(`report.taken_at >= :since`, { since })
      .andWhere('report.taken_at <= :until', { until })
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
    if (rawReport) {
      const {
        additions,
        deletions,
        new_commits,
        new_interactions,
        new_issues,
        new_prs,
        new_repositories,
      } = rawReport;

      const report: Report = {
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
    return {
      metrics: {
        additions: 0,
        deletions: 0,
        new_commits: 0,
        new_interactions: 0,
        new_issues: 0,
        new_prs: 0,
        new_repositories: 0,
      },
    };
  }
}

export default SpotDailyReportsRepository;
