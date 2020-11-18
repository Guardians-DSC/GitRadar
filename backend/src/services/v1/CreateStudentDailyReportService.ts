import { getRepository } from 'typeorm';
import StudentDailyReport from '../../models/StudentDailyReport';

interface Request {
  student_id: string;
  new_forks: number;
  new_issues: number;
  new_prs: number;
  new_stars: number;
  new_repositories: number;
  new_interactions: number;
  new_commits: number;
  additions: number;
  deletions: number;
}

class CreateStudentDailyReportService {
  async execute({
    student_id,
    new_forks,
    new_issues,
    new_prs,
    new_stars,
    new_repositories,
    new_interactions,
    new_commits,
    additions,
    deletions,
  }: Request): Promise<StudentDailyReport> {
    const studentDailyReportsRepository = getRepository(StudentDailyReport);

    const studentDailyReport = studentDailyReportsRepository.create({
      student_id,
      new_forks,
      new_issues,
      new_prs,
      new_stars,
      new_repositories,
      new_interactions,
      new_commits,
      additions,
      deletions,
    });
    await studentDailyReportsRepository.save(studentDailyReport);

    return studentDailyReport;
  }
}

export default CreateStudentDailyReportService;
