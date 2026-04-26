import { Router } from 'express';
import {
  createCapacity,
  deleteCapacity,
  getAllCapacities,
  getCapacityById,
  updateCapacity,
  restoreCapacity
} from '../controllers/capacityController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const capacityRouter: Router = Router();

capacityRouter.use(unverifiedCheck);

capacityRouter.get('/', getAllCapacities);

capacityRouter.get('/:id', getCapacityById);

capacityRouter.post('/', createCapacity);

capacityRouter.patch('/:id', updateCapacity);

capacityRouter.delete('/:id', deleteCapacity);

capacityRouter.patch('/restore/:id', restoreCapacity);

export default capacityRouter;