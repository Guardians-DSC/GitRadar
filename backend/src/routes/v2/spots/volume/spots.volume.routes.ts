import { Router } from 'express';
import authMiddleware from '../../../../middlewares/authMiddleware';
import GetInteractionsVolumeService from '../../../../services/Spot/GetInteractionsVolumeService';

const spotVolumeRouter = Router();

spotVolumeRouter.get(
  '/:spot_id/interactions',
  authMiddleware,
  async (request, response) => {
    const { spot_id } = request.params;

    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const getInteractionsVolume = new GetInteractionsVolumeService();

    const volume = await getInteractionsVolume.execute({
      spot_id,
      since: since as string,
      until: until as string,
    });

    return response.json(volume);
  },
);

export default spotVolumeRouter;
