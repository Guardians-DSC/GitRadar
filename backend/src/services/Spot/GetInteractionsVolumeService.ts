import { Between, getRepository } from 'typeorm';
import Spot from '../../models/Spot';
import SpotDailyReport from '../../models/SpotDailyReport';
import { AppError } from '../../errors/AppError';

interface Request {
  since: string;
  until: string;
  github_login: string;
}

interface Data {
  date: Date;
  value: number;
}

interface DataBaseRequest {
  taken_at: Date;
  new_interactions: number;
}

class GetInteractionsVolumeService {
  async execute({ since, until, github_login }: Request): Promise<Data[]> {
    const dailyReportRepository = getRepository(SpotDailyReport);
    const spotRepository = getRepository(Spot);

    const spot = await spotRepository.findOne({
      where: {
        github_login,
      },
    });

    if (!spot) {
      throw new AppError('Spot not registered', 400);
    }

    const dailyReports = await dailyReportRepository.find({
      where: {
        taken_at: Between(since, until),
        spot_id: spot.id,
      },
      select: ['taken_at', 'new_interactions'],
      order: {
        taken_at: 'ASC',
      },
    });

    const parsedData = dailyReports.map(
      ({ taken_at, new_interactions }: DataBaseRequest) => {
        return {
          value: new_interactions,
          date: taken_at,
        };
      },
    );

    return parsedData;
  }
}

export default GetInteractionsVolumeService;
