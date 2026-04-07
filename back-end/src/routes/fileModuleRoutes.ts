import { Router } from 'express';
import { upload } from '../middlewares/multer';
import {
  createFileModule,
  deleteFileModuleFile,
  deleteFileModule,
  getAllFileModules,
  getFileModuleById,
  getFileModulesByCompanyId,
  getFileModulesByPosition,
  getFileModulesByCompanyIdAndPosition,
  getFileModuleByType,
  getFileModuleByCompanyAndType,
  updateFileModuleFileHandler,
  updateFileModuleDataHandler,
  restoreFileModule
} from '../controllers/fileModuleController';

//TO DO: fileModuleRouter.delete('/:id/file', removeFileFromModule); esto para solamente borrar el archivo, ya se puede hacer de forma extraña con updateFileModuleFile

const fileModuleRouter: Router = Router();

fileModuleRouter.get('/', getAllFileModules);

fileModuleRouter.get('/company/:companyId/position/:position', getFileModulesByCompanyIdAndPosition);
fileModuleRouter.get('/company/:companyId/type/:type', getFileModuleByCompanyAndType);
fileModuleRouter.get('/company/:companyId', getFileModulesByCompanyId);//needs  fix
fileModuleRouter.get('/position/:position', getFileModulesByPosition);
fileModuleRouter.get('/type/:type', getFileModuleByType);

fileModuleRouter.get('/:id', getFileModuleById);

fileModuleRouter.post('/', upload.single("file"), createFileModule); //el atribute de archivo debe ser mandado con el nombre file desde el frontend, upload.single se encarga de subir el archivo

fileModuleRouter.patch('/:id', updateFileModuleDataHandler) 
//cuando el storedname tiene terminacion .pdf por ejemplo no se agregan los numeros random al final lo q podria causar errores
//cuando cambias el stored name no se mantiene la terminacion, asi que sipongo stored name = kitty se va  aguardar asi en vez de kitty.png
//patch currently broken because idfk save??
fileModuleRouter.patch('/:id/file',upload.single("file"), updateFileModuleFileHandler);
//datos no se actualizan en el db al cambiar el file

fileModuleRouter.delete('/:id/file', deleteFileModuleFile);

fileModuleRouter.delete('/:id', deleteFileModule);

fileModuleRouter.patch('/restore/:id', restoreFileModule);

export default fileModuleRouter;