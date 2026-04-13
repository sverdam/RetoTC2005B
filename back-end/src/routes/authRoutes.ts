
import { Router } from 'express';
import { loginAuthentication } from '../middlewares/authMiddleware';

const authRouter: Router = Router();

authRouter.get('/', loginAuthentication);

export default authRouter;