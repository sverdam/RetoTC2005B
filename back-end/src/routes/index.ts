import { Router, Request, Response } from 'express';
import companyRoutes from './companyRoutes';  
import userRoutes from './userRoutes';
import locationRoutes from './locationRoutes';
import contactRoutes from './contactRoutes';

const apiRouter:Router = Router();  

apiRouter.use('/company', companyRoutes);  
apiRouter.use('/user', userRoutes);  
apiRouter.use('/location', locationRoutes);
apiRouter.use('/contact', contactRoutes);

apiRouter.get('/', (req:Request, res: Response) => {  
res.send('Hello World!')  
})  

export default apiRouter; 