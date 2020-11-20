import { Router } from 'express';
import authMiddleware from '../../../../middlewares/authMiddleware';
import GetInteractionsVolumeService from '../../../../services/Spot/GetInteractionsVolumeService';
import GetLinesVolumeService from '../../../../services/Spot/GetLinesVolumeService';

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

spotVolumeRouter.get(
  '/:spot_id/lines',
  authMiddleware,
  async (request, response) => {
    const { spot_id } = request.params;

    let { until } = request.query;
    until = until || new Date().toISOString();
    const { since } = request.query;

    const getLinesVolume = new GetLinesVolumeService();

    const volume = await getLinesVolume.execute({
      spot_id,
      since: since as string,
      until: until as string,
    });

    return response.json(volume);
  },
);

export default spotVolumeRouter;
