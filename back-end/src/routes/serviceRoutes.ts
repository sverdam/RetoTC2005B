import { Router } from 'express';
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
  restoreService
} from '../controllers/serviceController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const serviceRouter: Router = Router();

serviceRouter.use(unverifiedCheck);

serviceRouter.get('/', getAllServices);

serviceRouter.get('/:id', getServiceById);

serviceRouter.post('/', createService);

serviceRouter.patch('/:id', updateService);

serviceRouter.delete('/:id', deleteService);

serviceRouter.patch('/restore/:id', restoreService);

export default serviceRouter;