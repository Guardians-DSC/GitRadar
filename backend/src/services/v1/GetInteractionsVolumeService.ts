import { Between, getRepository } from 'typeorm';
import StudentDailyReport from '../../models/StudentDailyReport';

interface Request {
  since: string;
  until: string;
  student_id: string;
}

interface Data {
  date: Date;
  value: number;
}

interface DataBaseRequest {
  created_at: Date;
  new_interactions: number;
}

class GetInteractionsVolume {
  async execute({ since, until, student_id }: Request): Promise<Data[]> {
    const dailyReportRepository = getRepository(StudentDailyReport);

    const dailyReports = await dailyReportRepository.find({
      where: {
        created_at: Between(since, until),
        student_id,
      },
      select: ['created_at', 'new_interactions'],
      order: {
        created_at: 'ASC',
      },
    });

    const parsedData = dailyReports.map(
      ({ created_at, new_interactions }: DataBaseRequest) => {
        return {
          value: new_interactions,
          date: created_at,
        };
      },
    );

    return parsedData;
  }
}

export default GetInteractionsVolume;
