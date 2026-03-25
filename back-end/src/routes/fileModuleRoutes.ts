import { Router } from 'express';
import { upload } from '../middlewares/multer';
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

fileModuleRouter.post('/', upload.single("file"), createFileModule); //el archivo debe ser mandado con el nombre file desde el frontend, upload.single se encarga de subir el archivo

fileModuleRouter.patch('/:id', updateFileModule);

fileModuleRouter.delete('/:id', deleteFileModule);

export default fileModuleRouter;