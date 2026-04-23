
import { Request, Response } from 'express';
import { Router } from 'express';
import { loginAuthentication, tokenAuthorization, getProfile } from '../middlewares/authMiddleware';
import { profile } from 'node:console';

const authRouter: Router = Router();

authRouter.get('/test', tokenAuthorization, (req: Request, res: Response) => 
    {
        console.log("Test");
        res.status(200).json({
                    status: "success",
                    message: "Test",
                    user: req.user,
                    header: req.headers,
                    body: req.body
                });
    }
)

authRouter.post('/', loginAuthentication);
authRouter.get('/profile', getProfile)

export default authRouter;