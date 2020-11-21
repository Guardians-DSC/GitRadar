import { getRepository } from 'typeorm';
import Repository from '../../models/Repository';

interface Request {
  spotId: string;
}

class GetSpotRepositories {
  async execute({ spotId }: Request): Promise<Repository[]> {
    const repositoriesRepository = getRepository(Repository);

    const repositories = repositoriesRepository.find({
      where: {
        spot_id: spotId,
      },
    });

    return repositories;
  }
}

export default GetSpotRepositories;
