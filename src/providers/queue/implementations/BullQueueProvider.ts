import { setQueues } from 'bull-board';
import { Queue, QueueScheduler } from 'bullmq';
import {
  addJobRequest,
  QueueProvider,
  registerQueueRequest,
} from '../QueueProvider';

class BullQueueProvider implements QueueProvider {
  private queues: Queue[];

  private queueSchedulers: QueueScheduler[];

  constructor() {
    this.queues = [];
    this.queueSchedulers = [];
  }

  setUI(): void {
    setQueues(this.queues);
  }

  register({ queueName }: registerQueueRequest): void {
    const queue = this.queues.find(q => q.name === queueName);

    if (queue) {
      throw new Error('Queue name already registered.');
    }

    this.queues.push(new Queue(queueName));
    this.queueSchedulers.push(new QueueScheduler(queueName));
  }

  add({ queueName, job, jobName, opts }: addJobRequest): void {
    const queue = this.queues.find(q => q.name === queueName);

    if (!queue) {
      throw new Error('Queue dont exist.');
    }

    queue.add(jobName, job, {
      removeOnComplete: opts?.removeOnComplete,
    });
  }
}

export default BullQueueProvider;
