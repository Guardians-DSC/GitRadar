import { getRepository } from 'typeorm';
import { queueProvider } from '../../app';
import Spot from '../../models/Spot';

const RequestSpotsProcessProcessor = async (): Promise<void> => {
  const spotsRepository = getRepository(Spot);
  const since = new Date();
  since.setHours(0);
  since.setMinutes(0);
  since.setSeconds(0);
  since.setMilliseconds(0);

  const spots = await spotsRepository.find();

  spots.forEach((spot: Spot) => {
    console.log(
      `Request spot ${spot.github_login} process at ${since.toISOString()}`,
    );

    queueProvider.add({
      job: {
        spot_id: spot.id,
        date: since.toISOString(),
        github_name: spot.github_login,
      },
      jobName: `${spot.github_login} process request at ${since.toISOString()}`,
      queueName: 'spot-processor',
      opts: {
        removeOnComplete: false,
      },
    });
  });
};

export default RequestSpotsProcessProcessor;
