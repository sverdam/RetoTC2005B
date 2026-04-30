import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  restoreCategory
} from '../controllers/categoryController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const categoryRouter: Router = Router();

categoryRouter.use(unverifiedCheck);

categoryRouter.get('/', getAllCategories);

categoryRouter.get('/:id', getCategoryById);

categoryRouter.post('/', createCategory);

categoryRouter.patch('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);

categoryRouter.patch('/restore/:id', restoreCategory);

export default categoryRouter;