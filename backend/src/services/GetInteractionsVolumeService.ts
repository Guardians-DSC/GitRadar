import { Between, getRepository } from 'typeorm';
import StudentDailyReport from '../models/StudentDailyReport';

interface Request {
  since: string;
  until: string;
  student_id: string;
}

interface Data {
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
    });

    return dailyReports;
  }
}

export default GetInteractionsVolume;
