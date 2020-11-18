import { getRepository } from 'typeorm';
import { queueProvider } from '../../app';
import Spot from '../../models/Spot';

const RequestSpotsProcessProcessor = async (): Promise<void> => {
  const spotsRepository = getRepository(Spot);

  const spots = await spotsRepository.find();

  spots.forEach((spot: Spot) => {
    console.log(`Request spot ${spot.github_login} process`);

    queueProvider.add({
      job: {
        github_id: spot.github_id,
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
