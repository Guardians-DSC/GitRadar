import { Job } from 'bullmq';

import { getRepository } from 'typeorm';
import { SpotRequest } from '../../providers/queue/QueueProvider';
import Spot from '../../models/Spot';
import GetDailyReportService from '../../services/DailyReport/GetDailyReportService';
import Commit from '../../models/Commit';
import SpotDailyReport from '../../models/SpotDailyReport';
import Repository from '../../models/Repository';

const ProcessSpotProcessor = async (job: Job<SpotRequest>): Promise<void> => {
  const { github_id } = job.data;

  const spotRepository = getRepository(Spot);
  const commitRepository = getRepository(Commit);
  const dailyReportRepository = getRepository(SpotDailyReport);
  const repositoriesRepository = getRepository(Repository);

  const { github_login, id: spot_id } = await spotRepository.findOne({
    github_id,
  });

  const getDailyReportService = new GetDailyReportService();

  const { payload } = await getDailyReportService.execute({
    github_login,
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
    new_forks: 0,
    new_interactions,
    new_issues,
    new_prs,
    new_repositories,
    new_stars: 0,
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

    const { id: repository_id } = await repositoriesRepository.findOne({
      github_id: commit.repository.id,
    });

    const spotCommit = commitRepository.create({
      additions: commit_additions,
      deletions: commit_deletions,
      message,
      spot_daily_report_id,
      spot_id,
      repository_id,
      sha,
    });

    await dailyReportRepository.save(spotCommit);
  }
};

export default ProcessSpotProcessor;
