import { Router } from 'express';
import {
  createFilter,
  deleteFilter,
  getAllFilters,
  getFilterById,
  updateFilter,
  restoreFilter
} from '../controllers/filterController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const filterRouter: Router = Router();

filterRouter.use(unverifiedCheck);

filterRouter.get('/', getAllFilters);

filterRouter.get('/:id', getFilterById);

filterRouter.post('/', createFilter);

filterRouter.patch('/:id', updateFilter);

filterRouter.delete('/:id', deleteFilter);

filterRouter.patch('/restore/:id', restoreFilter);

export default filterRouter;