import { Router, Request, Response } from 'express';
import companyRoutes from './companyRoutes';  
import userRoutes from './userRoutes';
import locationRoutes from './locationRoutes';
import contactRoutes from './contactRoutes';
import categoryRoutes from './categoryRoutes';
import filterRoutes from './filterRoutes';
import textModuleRoutes from './textModuleRoutes';
import authRoutes from './authRoutes';
import fileModuleRoutes from './fileModuleRoutes';
import productRoutes from './productRoutes';
import serviceRouter from './serviceRoutes';
import certificationRouter from './certificationRoutes';
import capacityRouter from './capacitiyRoutes';
import landingPageRouter from './landingPageRoutes';

const apiRouter:Router = Router();  

apiRouter.use(authRoutes); // Auth routes and middleware

apiRouter.use('/company', companyRoutes);  
apiRouter.use('/user', userRoutes);  
apiRouter.use('/location', locationRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/category', categoryRoutes);
apiRouter.use('/filter', filterRoutes);
apiRouter.use('/textModule', textModuleRoutes);
apiRouter.use('/fileModule', fileModuleRoutes);
apiRouter.use('/product', productRoutes);
apiRouter.use('/service', serviceRouter)
apiRouter.use('/certification', certificationRouter);
apiRouter.use('/capacity', capacityRouter);
apiRouter.use('/landing', landingPageRouter);

apiRouter.get('/', (req:Request, res: Response) => {  
res.send('Hello World!')  
})  

export default apiRouter; 