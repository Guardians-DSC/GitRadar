import { getRepository } from 'typeorm';
import { queueProvider } from '../../app';
import Spot from '../../models/Spot';

const RequestSpotsProcessProcessor = async (): Promise<void> => {
  const spotsRepository = getRepository(Spot);

  const today = new Date();
  const since = new Date(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
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
      today.getDate(),
      23,
      59,
      59,
      999,
    ),
  );

  console.log(
    `Starting spot crawl request at ${since.toISOString()} - ${until.toISOString()}`,
  );
  console.log('aaaaa', since.getTimezoneOffset());

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
