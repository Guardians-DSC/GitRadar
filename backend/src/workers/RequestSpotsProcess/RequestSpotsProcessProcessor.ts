import { getRepository } from 'typeorm';
import { queueProvider } from '../../app';
import Spot from '../../models/Spot';

const RequestSpotsProcessProcessor = async (): Promise<void> => {
  const spotsRepository = getRepository(Spot);
  const since = new Date();
  const until = new Date();

  // since
  since.setHours(-3);
  since.setMinutes(0);
  since.setSeconds(0);
  since.setMilliseconds(0);

  // until
  until.setHours(20);
  until.setMinutes(59);
  until.setSeconds(59);
  until.setMilliseconds(59);

  console.log(
    `Starting spot crawl request at ${since.toISOString()} - ${until.toISOString()}`,
  );

  const spots = await spotsRepository.find();

  spots.forEach((spot: Spot) => {
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
  });
};

export default RequestSpotsProcessProcessor;
