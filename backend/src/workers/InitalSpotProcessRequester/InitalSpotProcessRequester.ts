import { Job } from 'bullmq';
import { getRepository } from 'typeorm';
import { queueProvider } from '../../app';
import Spot from '../../models/Spot';
import { SpotRequest } from '../../providers/queue/QueueProvider';
import { AppError } from '../../errors/AppError';

const InitalSpotProcessRequester = async (
  job: Job<SpotRequest>,
): Promise<void> => {
  const { spot_id } = job.data;
  const spotsRepository = getRepository(Spot);

  const spot = await spotsRepository.findOne({
    where: {
      id: spot_id,
    },
  });

  if (!spot) {
    throw new AppError('Spot not registered');
  }

  const today = new Date();
  const since = new Date(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      0,
      0,
      0,
      0,
    ),
  );
  const until = new Date(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      23,
      59,
      59,
      999,
    ),
  );

  for (let day = 0; day < 30; day += 1) {
    console.log(
      `Starting spot crawl request at ${since.toISOString()} - ${until.toISOString()}`,
    );

    console.log(
      `Request spot ${spot.github_login} process at ${since.toISOString()}`,
    );

    queueProvider.add({
      job: {
        spot_id: spot.id,
        since: since.toISOString(),
        until: until.toISOString(),
        github_name: spot.github_login,
      },
      jobName: `${
        spot.github_login
      } process request at ${since.toISOString()} - ${until.toISOString()}`,
      queueName: 'spot-processor',
      opts: {
        removeOnComplete: false,
      },
    });

    since.setDate(since.getDate() - 1);
    until.setDate(until.getDate() - 1);
  }
};

export default InitalSpotProcessRequester;
