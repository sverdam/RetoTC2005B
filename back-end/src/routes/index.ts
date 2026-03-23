import { Router, Request, Response } from 'express';
import companyRoutes from './companyRoutes';  
import userRoutes from './userRoutes';
import locationRoutes from './locationRoutes';
import contactRoutes from './contactRoutes';
import categoryRoutes from './categoryRoutes';
import filterRoutes from './filterRoutes';

const apiRouter:Router = Router();  

apiRouter.use('/company', companyRoutes);  
apiRouter.use('/user', userRoutes);  
apiRouter.use('/location', locationRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/category', categoryRoutes);
apiRouter.use('/filter', filterRoutes);

apiRouter.get('/', (req:Request, res: Response) => {  
res.send('Hello World!')  
})  

export default apiRouter; 