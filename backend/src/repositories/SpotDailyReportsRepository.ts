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
  spot?: {
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
    const { since: parsedSince, until: parsedUntil } = this.parseDates(
      since,
      until,
    );

    console.log(parsedSince);
    console.log(parsedUntil);

    const rawReport: RawReport = await this.createQueryBuilder('report')
      .where('report.spot_id = :id', { id: spot_id })
      .leftJoinAndSelect('report.spot', 'spot')
      .andWhere(`report.taken_at >= :since`, {
        since: parsedSince.toISOString(),
      })
      .andWhere('report.taken_at < :until', {
        until: parsedUntil.toISOString(),
      })
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
    const { since: parsedSince, until: parsedUntil } = this.parseDates(
      since,
      until,
    );

    const rawReport: RawReport[] = await this.createQueryBuilder('report')
      .leftJoinAndSelect('report.spot', 'spot')
      .andWhere(`report.taken_at >= :since`, {
        since: parsedSince.toISOString(),
      })
      .andWhere('report.taken_at < :until', {
        until: parsedUntil.toISOString(),
      })
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

  private parseDates(
    since: string,
    until: string,
  ): { since: Date; until: Date } {
    const sinceDate = new Date(since);
    const untilDate = new Date(until);

    const parsedSince = new Date(
      Date.UTC(
        sinceDate.getFullYear(),
        sinceDate.getMonth(),
        sinceDate.getDate(),
        0,
        0,
        0,
        0,
      ),
    );

    const parsedUntil = new Date(
      Date.UTC(
        untilDate.getFullYear(),
        untilDate.getMonth(),
        untilDate.getDate(),
        23,
        59,
        59,
        59,
      ),
    );

    return {
      since: parsedSince,
      until: parsedUntil,
    };
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
        spot_avatar_url,
        spot_created_at,
        spot_github_id,
        spot_github_login,
        spot_id,
        spot_manager_id,
        spot_name,
        spot_top_language,
        spot_updated_at,
      } = rawReport;

      const report: Report = {
        spot: {
          id: spot_id,
          github_login: spot_github_login,
          manager_id: spot_manager_id,
          avatar_url: spot_avatar_url,
          top_language: spot_top_language,
          github_id: spot_github_id,
          name: spot_name,
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
