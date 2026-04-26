import { Router } from 'express';
import { upload } from '../middlewares/multer';
import { 
    createCompany,  
    deleteCompany,  
    getAllCompanies,  
    getCompanyById,  
    updateCompany,
    restoreCompany
} from '../controllers/companyController'; 

const companyRouter:Router = Router();  

companyRouter.get('/', getAllCompanies);  

companyRouter.get('/:id', getCompanyById);  

companyRouter.post('/', upload.single('logo'), createCompany);

companyRouter.patch('/:id', updateCompany);  

companyRouter.delete('/:id', deleteCompany); 

companyRouter.patch('/restore/:id', restoreCompany);

export default companyRouter; 


