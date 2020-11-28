interface SpotRequest {
  spot_id: string;
  since: string;
  until: string;
  github_name: string;
}

interface InitalSpotRequest {
  spot_id: string;
}

interface addJobRequest {
  queueName: string;
  jobName: string;
  job?: SpotRequest;
  opts?: {
    removeOnComplete: boolean;
  };
}

interface registerQueueRequest {
  queueName: string;
}

interface QueueProvider {
  register({ queueName }: registerQueueRequest): void;
  add({ queueName, job, jobName, opts }: addJobRequest): void;
  setUI(): void;
}

export {
  QueueProvider,
  addJobRequest,
  registerQueueRequest,
  SpotRequest,
  InitalSpotRequest,
};
