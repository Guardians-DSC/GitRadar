import { getRepository } from 'typeorm';
import Repository from '../../models/Repository';
import Spot from '../../models/Spot';
import { AppError } from '../../errors/AppError';

interface Request {
  github_login: string;
}

class GetSpotRepositories {
  async execute({ github_login }: Request): Promise<Repository[]> {
    const repositoriesRepository = getRepository(Repository);
    const spotRepository = getRepository(Spot);

    const spot = await spotRepository.findOne({
      where: {
        github_login,
      },
    });

    if (!spot) {
      throw new AppError('Spot not registered', 400);
    }

    const repositories = await repositoriesRepository.find({
      where: {
        spot_id: spot.id,
      },
      loadEagerRelations: false,
    });

    return repositories;
  }
}

export default GetSpotRepositories;
