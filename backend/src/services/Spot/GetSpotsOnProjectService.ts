import { getRepository } from 'typeorm';
import Spot from '../../models/Spot';

class GetSpotsOnProjectService {
  async execute(): Promise<Spot[]> {
    const spotsRepository = getRepository(Spot);

    const spots = await spotsRepository.find({
      loadEagerRelations: false,
    });

    return spots;
  }
}

export default GetSpotsOnProjectService;
