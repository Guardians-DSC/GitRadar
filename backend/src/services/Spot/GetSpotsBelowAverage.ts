import { getCustomRepository } from 'typeorm';
import SpotDailyReportsRepository from '../../repositories/SpotDailyReportsRepository';
import GetSpotsService from './GetSpotsService';

class GetSpotsBelowAverage {
  async execute(): Promise<Spot[]> {
    const spotDailyRepository = getCustomRepository(SpotDailyReportsRepository);
    const getSpotsService = new GetSpotsService();

    const spots = await getSpotsService.execute();
  }
}

export default GetSpotsBelowAverage;
