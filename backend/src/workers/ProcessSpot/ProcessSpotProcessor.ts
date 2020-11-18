import { Job } from 'bullmq';

import { getRepository } from 'typeorm';
import { SpotRequest } from '../../providers/queue/QueueProvider';
import GetDailyReportService from '../../services/DailyReport/GetDailyReportService';
import Commit from '../../models/Commit';
import SpotDailyReport from '../../models/SpotDailyReport';

const ProcessSpotProcessor = async (job: Job<SpotRequest>): Promise<void> => {
  const { spot_id, date, github_name: github_login } = job.data;

  const commitRepository = getRepository(Commit);
  const dailyReportRepository = getRepository(SpotDailyReport);

  const getDailyReportService = new GetDailyReportService();

  const { payload } = await getDailyReportService.execute({
    github_login,
    date,
  });

  const {
    additions,
    deletions,
    commits,
    new_commits,
    new_interactions,
    new_issues,
    new_prs,
    new_repositories,
  } = payload;

  const dailyReport = dailyReportRepository.create({
    additions,
    deletions,
    new_commits,
    new_interactions,
    new_issues,
    new_prs,
    new_repositories,
    spot_id,
  });

  const { id: spot_daily_report_id } = await dailyReportRepository.save(
    dailyReport,
  );

  for await (const commit of commits) {
    const {
      additions: commit_additions,
      deletions: commit_deletions,
      message,
      sha,
    } = commit;

    const spotCommit = commitRepository.create({
      additions: commit_additions,
      deletions: commit_deletions,
      message,
      spot_daily_report_id,
      spot_id,
      sha,
    });

    await dailyReportRepository.save(spotCommit);
  }
};

export default ProcessSpotProcessor;
