import { getRepository } from 'typeorm';
import Spot from '../../models/Spot';

class GetSpotsService {
  async execute(): Promise<Spot[]> {
    const spotsRepository = getRepository(Spot);

    const spots = await spotsRepository.find({
      loadEagerRelations: false,
    });

    return spots;
  }
}

export default GetSpotsService;
