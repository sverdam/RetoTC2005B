import { Router } from 'express';
import { upload } from '../middlewares/multer';
import {
  createFileModule,
  deleteFileModuleFile,
  deleteFileModule,
  getAllFileModules,
  getFileModuleById,
  updateFileModuleFileHandler,
  updateFileModuleDataHandler
} from '../controllers/fileModuleController';

//TO DO: fileModuleRouter.delete('/:id/file', removeFileFromModule); esto para solamente borrar el archivo, ya se puede hacer de forma extraña con updateFileModuleFile

const fileModuleRouter: Router = Router();

fileModuleRouter.get('/', getAllFileModules);

fileModuleRouter.get('/:id', getFileModuleById);

fileModuleRouter.post('/', upload.single("file"), createFileModule); //el archivo debe ser mandado con el nombre file desde el frontend, upload.single se encarga de subir el archivo

fileModuleRouter.patch('/', updateFileModuleDataHandler)

fileModuleRouter.patch('/file',upload.single("file"), updateFileModuleFileHandler);

fileModuleRouter.delete('/file', deleteFileModuleFile);

fileModuleRouter.delete('/', deleteFileModule);

export default fileModuleRouter;