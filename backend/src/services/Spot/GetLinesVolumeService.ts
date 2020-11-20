import { Between, getRepository } from 'typeorm';
import SpotDailyReport from '../../models/SpotDailyReport';

interface Request {
  since: string;
  until: string;
  spot_id: string;
}

interface Data {
  date: Date;
  gains: number;
  loss: number;
}

interface DataBaseRequest {
  created_at: Date;
  additions: number;
  deletions: number;
}

class GetLinesVolumeService {
  async execute({ since, until, spot_id }: Request): Promise<Data[]> {
    const dailyReportRepository = getRepository(SpotDailyReport);

    const dailyReports = await dailyReportRepository.find({
      where: {
        created_at: Between(since, until),
        spot_id,
      },
      select: ['created_at', 'additions', 'deletions'],
      order: {
        created_at: 'ASC',
      },
    });

    const parsedData = dailyReports.map(
      ({ created_at, additions, deletions }: DataBaseRequest) => {
        return {
          gains: additions,
          loss: deletions,
          date: created_at,
        };
      },
    );

    return parsedData;
  }
}

export default GetLinesVolumeService;
