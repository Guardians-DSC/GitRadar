import { Job } from 'bullmq';

import { SpotRequest } from '../../providers/queue/QueueProvider';

const ProcessSpotProcessor = async (job: Job<SpotRequest>): Promise<void> => {
  console.log(job);
  return null;
};

export default ProcessSpotProcessor;
