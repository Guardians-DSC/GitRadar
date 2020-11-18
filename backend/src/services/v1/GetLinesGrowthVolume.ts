import { Between, getRepository } from 'typeorm';
import StudentDailyReport from '../../models/StudentDailyReport';

interface Request {
  since: string;
  until: string;
  student_id: string;
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

class GetLinesGrowthVolume {
  async execute({ since, until, student_id }: Request): Promise<Data[]> {
    const dailyReportRepository = getRepository(StudentDailyReport);

    const dailyReports = await dailyReportRepository.find({
      where: {
        created_at: Between(since, until),
        student_id,
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

export default GetLinesGrowthVolume;
