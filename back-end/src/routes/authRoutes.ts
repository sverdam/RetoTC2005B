
import { Request, Response } from 'express';
import { Router } from 'express';
import { loginAuthentication, tokenAuthorization, adminCheck, getProfile, logout } from '../middlewares/authMiddleware';

const authRouter: Router = Router();

// Decodes JWT token from the request
authRouter.use(tokenAuthorization);

// Check admin requierements and blocks unauthorized modifications requests 
authRouter.use(adminCheck);         

authRouter.get('/auth/test', tokenAuthorization, (req: Request, res: Response) => 
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

authRouter.post('/auth/login', loginAuthentication);
authRouter.post('/auth/logout', logout);
authRouter.get('/auth/profile', getProfile)

export default authRouter;