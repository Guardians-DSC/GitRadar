import { getRepository } from 'typeorm';
import { queueProvider } from '../../app';
import Spot from '../../models/Spot';

const RequestSpotsProcessProcessor = async (): Promise<void> => {
  const spotsRepository = getRepository(Spot);
  const since = new Date();
  since.setHours(since.getHours() - 3);

  const spots = await spotsRepository.find();

  spots.forEach((spot: Spot) => {
    console.log(`Request spot ${spot.github_login} process`);

    queueProvider.add({
      job: {
        github_id: spot.github_id,
        date: since.toISOString(),
        github_name: spot.github_login,
      },
      jobName: `${spot.github_id} process request`,
      queueName: 'spot-processor',
      opts: {
        removeOnComplete: false,
      },
    });
  });
};

export default RequestSpotsProcessProcessor;
