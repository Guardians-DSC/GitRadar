import { Between, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Spot from '../../models/Spot';
import SpotDailyReport from '../../models/SpotDailyReport';

interface Request {
  since: string;
  until: string;
  github_login: string;
}

interface Data {
  date: Date;
  gains: number;
  loss: number;
}

interface DataBaseRequest {
  taken_at: Date;
  additions: number;
  deletions: number;
}

class GetLinesVolumeService {
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
      select: ['taken_at', 'additions', 'deletions'],
      order: {
        taken_at: 'ASC',
      },
    });

    const parsedData = dailyReports.map(
      ({ taken_at, additions, deletions }: DataBaseRequest) => {
        return {
          gains: additions,
          loss: deletions,
          date: taken_at,
        };
      },
    );

    return parsedData;
  }
}

export default GetLinesVolumeService;
