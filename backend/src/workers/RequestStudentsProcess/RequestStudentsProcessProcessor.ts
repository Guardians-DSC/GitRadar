import { getRepository } from 'typeorm';
import { queueProvider } from '../../app';
import Student from '../../models/Spot';

const requestStudentsProcessProcessor = async (): Promise<void> => {
  const studentsRepository = getRepository(Student);

  const students = await studentsRepository.find();

  students.forEach((student: Student) => {
    console.log(`Request student ${student.github_login} process`);

    queueProvider.add({
      job: {
        github_id: student.github_id,
      },
      jobName: `${student.github_id} process request`,
      queueName: 'student-processor',
      opts: {
        removeOnComplete: false,
      },
    });
  });
};

export default requestStudentsProcessProcessor;
