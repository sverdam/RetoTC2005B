import { Router } from 'express';
import {
  createTextModule,
  deleteTextModule,
  getAllTextModules,
  getTextModuleById,
  updateTextModule
} from '../controllers/textModuleController';

const textModuleRouter: Router = Router();

textModuleRouter.get('/', getAllTextModules);

textModuleRouter.get('/:id', getTextModuleById);

textModuleRouter.post('/', createTextModule);

textModuleRouter.patch('/:id', updateTextModule);

textModuleRouter.delete('/:id', deleteTextModule);

export default textModuleRouter;