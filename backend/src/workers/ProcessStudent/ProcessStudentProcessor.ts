import { getRepository } from 'typeorm';
import { Job } from 'bullmq';
import Student from '../../models/Student';
import Repository from '../../models/Repository';
import { StudentRequest } from '../../providers/queue/QueueProvider';

import GetUserService from '../../services/v1/GetUserService';
import GetUserDailyReportService from '../../services/v1/GetUserDailyReportService';
import CreateStudentDailyReportService from '../../services/v1/CreateStudentDailyReportService';
import CreateCommitService from '../../services/v1/CreateCommitService';

const processStudentProcessor = async (
  job: Job<StudentRequest>,
): Promise<void> => {
  const { github_id } = job.data;

  const studentsRepository = getRepository(Student);
  const repositoriesRepository = getRepository(Repository);

  const { id: student_id } = await studentsRepository.findOne({ github_id });

  const getUser = new GetUserService();
  const { github_login } = await getUser.execute({ github_id });

  const getUserDailyReport = new GetUserDailyReportService();
  const { payload } = await getUserDailyReport.execute(github_login);

  const {
    additions,
    commits,
    deletions,
    new_commits,
    new_forks,
    new_interactions,
    new_issues,
    new_prs,
    new_repositories,
    new_stars,
  } = payload;

  const createStudentDailyReport = new CreateStudentDailyReportService();
  const studentDailyReport = await createStudentDailyReport.execute({
    additions,
    deletions,
    new_commits,
    new_forks,
    new_interactions,
    new_issues,
    new_prs,
    new_repositories,
    new_stars,
    student_id,
  });

  const createCommit = new CreateCommitService();
  for (const commit of commits) {
    const repository = await repositoriesRepository.findOne({
      github_id: commit.repository.id,
    });

    let repository_id = null;
    if (repository) {
      repository_id = repository.id;
    }

    await createCommit.execute({
      additions: commit.additions,
      deletions: commit.deletions,
      message: commit.message,
      sha: commit.sha,
      student_daily_report_id: studentDailyReport.id,
      student_id,
      repository_id,
    });
  }
};

export default processStudentProcessor;
