import { EntityRepository, Repository, Between } from 'typeorm';

import StudentDailyReport from '../models/StudentDailyReport';

@EntityRepository(StudentDailyReport)
class StudentDailyReportsRepository extends Repository<StudentDailyReport> {
  public async findByPeriod(
    since: Date,
    until: Date,
  ): Promise<StudentDailyReport[] | null> {
    const findStudentDailyReport = await this.find({
      where: { created_at: Between(since, until) },
    });

    return findStudentDailyReport || null;
  }
}

export default StudentDailyReportsRepository;
