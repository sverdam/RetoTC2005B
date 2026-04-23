import { Router } from 'express';
import {
  createTextModule,
  deleteTextModule,
  getAllTextModules,
  getTextModuleById,
  updateTextModule,
  restoreTextModule
} from '../controllers/textModuleController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const textModuleRouter: Router = Router();

textModuleRouter.use(unverifiedCheck);

textModuleRouter.get('/', getAllTextModules);

textModuleRouter.get('/:id', getTextModuleById);

textModuleRouter.post('/', createTextModule);

textModuleRouter.patch('/:id', updateTextModule);

textModuleRouter.delete('/:id', deleteTextModule);

textModuleRouter.patch('/restore/:id', restoreTextModule);

export default textModuleRouter;