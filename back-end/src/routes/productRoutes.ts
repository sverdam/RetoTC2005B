import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByCompany,
  updateProduct,
  createProductWithFileModule
} from '../controllers/productController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const productRouter: Router = Router();

productRouter.use(unverifiedCheck);

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductById);

productRouter.post('/withFile', createProductWithFileModule);

productRouter.post('/', createProduct);

productRouter.patch('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

productRouter.get('/company/:id', getProductByCompany);

export default productRouter;