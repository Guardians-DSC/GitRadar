import { EntityRepository, Repository, Between } from 'typeorm';

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

    const foundSpotDailyReports = await this.find({
      where: {
        created_at: Between(since, until),
        spot_id,
      },
    });

    return foundSpotDailyReports || null;
  }
}

export default SpotDailyReportsRepository;
