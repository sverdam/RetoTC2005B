import { Router } from 'express';
import {
  createCompanyFilter,
  getAllCompanyFilters,
  getCompanyFilterByComapnyId,
  getCompanyFilterByFilterId,
  updateCompanyFilter,
  deleteCompanyFilter,
  restoreCompanyFilter
} from '../controllers/companyFilterController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const companyFilterRouter: Router = Router();

companyFilterRouter.use(unverifiedCheck);

companyFilterRouter.get('/', getAllCompanyFilters);

companyFilterRouter.get('/company/:id', getCompanyFilterByComapnyId);

companyFilterRouter.get('/filter/:id', getCompanyFilterByFilterId);

companyFilterRouter.post('/', createCompanyFilter);

companyFilterRouter.patch('/company/:companyId/filter/:filterId', updateCompanyFilter);

companyFilterRouter.delete('/company/:companyId/filter/:filterId', deleteCompanyFilter);

companyFilterRouter.patch('/restore/company/:companyId/filter/:filterId', restoreCompanyFilter);

export default companyFilterRouter;