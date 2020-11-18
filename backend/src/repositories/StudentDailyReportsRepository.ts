import { EntityRepository, Repository, Between } from 'typeorm';

import StudentDailyReport from '../models/SpotDailyReport';

@EntityRepository(StudentDailyReport)
class StudentDailyReportsRepository extends Repository<StudentDailyReport> {
  public async findByPeriod(
    student_id: string,
    since: Date,
    until: Date,
  ): Promise<StudentDailyReport[] | null> {
    since.setDate(since.getDate() - 1);
    until.setDate(until.getDate() + 1);

    const foundStudentDailyReports = await this.find({
      where: {
        created_at: Between(since, until),
        student_id,
      },
    });

    return foundStudentDailyReports || null;
  }
}

export default StudentDailyReportsRepository;
