import { Router } from 'express';
import {
  createFilter,
  deleteFilter,
  getAllFilters,
  getFilterById,
  updateFilter
} from '../controllers/filterController';

const filterRouter: Router = Router();

filterRouter.get('/', getAllFilters);

filterRouter.get('/:id', getFilterById);

filterRouter.post('/', createFilter);

filterRouter.patch('/:id', updateFilter);

filterRouter.delete('/:id', deleteFilter);

export default filterRouter;