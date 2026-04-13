
import { Router } from 'express';
import { loginAuthentication } from '../middlewares/loginController';

const authRouter: Router = Router();

authRouter.get('/', loginAuthentication);

export default authRouter;