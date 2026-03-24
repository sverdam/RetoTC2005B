import { Router } from 'express';
import {
  createFileModule,
  deleteFileModule,
  getAllFileModules,
  getFileModuleById,
  updateFileModule
} from '../controllers/fileModuleController';

const fileModuleRouter: Router = Router();

fileModuleRouter.get('/', getAllFileModules);

fileModuleRouter.get('/:id', getFileModuleById);

fileModuleRouter.post('/', createFileModule);

fileModuleRouter.patch('/:id', updateFileModule);

fileModuleRouter.delete('/:id', deleteFileModule);

export default fileModuleRouter;