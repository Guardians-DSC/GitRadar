import { getRepository } from 'typeorm';
import Student from '../models/Student';
import GetPeriodStudentDailyReportsService from './GetPeriodStudentDailyReportsService';

interface Response {
  all_new_interactions: number;
  all_new_commits: number;
  new_interactions_average: number;
  new_commits_average: number;
}

class GetClassReport {
  async execute(since: string, until: string): Promise<Response> {
    const classInformation: Response = {
      all_new_interactions: 0,
      all_new_commits: 0,
      new_interactions_average: 0,
      new_commits_average: 0,
    };

    const studentsRepository = getRepository(Student);
    const students = await studentsRepository.find();

    for (const student of students) {
      const getPeriodStudentDailyReport = new GetPeriodStudentDailyReportsService();
      const currentDailyReport = await getPeriodStudentDailyReport.execute(
        student.id,
        since,
        until,
      );

      classInformation.all_new_commits += currentDailyReport.new_commits;
      classInformation.all_new_interactions +=
        currentDailyReport.new_interactions;
    }

    if (students.length !== 0) {
      classInformation.new_commits_average =
        classInformation.all_new_commits / students.length;
      classInformation.new_interactions_average =
        classInformation.all_new_interactions / students.length;
    }

    return classInformation;
  }
}

export default GetClassReport;
