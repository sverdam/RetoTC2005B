import { Router, Request, Response } from 'express';

const apiRouter:Router = Router();  

//apiRouter.use('/<route>', <router>);  

apiRouter.get('/', (req:Request, res: Response) => {  
res.send('Hello World!')  
})  

export default apiRouter; 