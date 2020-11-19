import { EntityRepository, Repository } from 'typeorm';

import SpotDailyReport from '../models/SpotDailyReport';

@EntityRepository(SpotDailyReport)
class SpotDailyReportsRepository extends Repository<SpotDailyReport> {
  public async findByPeriod(
    spot_id: string,
    since: Date,
    until: Date,
  ): Promise<SpotDailyReport[] | null> {
    since.setDate(since.getDate() - 1);
    until.setDate(until.getDate() + 1);

    const report = await this.createQueryBuilder('report')
      .where('report.spot_id = :id', { id: spot_id })
      .leftJoinAndSelect('report.spot', 'spot')
      .andWhere(`report.created_at >= :since`, { since: since.toISOString() })
      .andWhere('report.created_at < :until', { until: until.toISOString() })
      .select('SUM(report.new_interactions)', 'new_interactions')
      .addSelect('SUM(report.new_commits)', 'new_commits')
      .addSelect('SUM(report.new_prs)', 'new_prs')
      .addSelect('SUM(report.new_issues)', 'new_issues')
      .addSelect('SUM(report.new_repositories)', 'new_repositories')
      .addSelect('SUM(report.additions)', 'additions')
      .addSelect('SUM(report.deletions)', 'deletions')
      .getRawOne();

    return report;
  }
}

export default SpotDailyReportsRepository;
