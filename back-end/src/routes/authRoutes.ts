
import { Request, Response } from 'express';
import { Router } from 'express';
import { loginAuthentication, tokenAuthorization } from '../middlewares/authMiddleware';

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

authRouter.get('/', loginAuthentication);

export default authRouter;