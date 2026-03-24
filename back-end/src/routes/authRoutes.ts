
import { Router } from 'express';
import { loginAuthentication } from '../controllers/loginController';

const authRouter: Router = Router();

authRouter.get('/', loginAuthentication);

export default authRouter;