import { getRepository } from 'typeorm';
import Repository from '../../models/Repository';

interface Request {
  spot_id: string;
}

class GetSpotRepositories {
  async execute({ spot_id }: Request): Promise<Repository[]> {
    const repositoriesRepository = getRepository(Repository);

    const repositories = await repositoriesRepository.find({
      where: {
        spot_id,
      },
    });

    return repositories;
  }
}

export default GetSpotRepositories;
