import { Router } from 'express';
import { getLandingPage, updateLandingPage, getExtraInfo } from '../controllers/landingPageController';

const landingPageRouter: Router = Router();

landingPageRouter.get('/info', getExtraInfo)
landingPageRouter.get('/', getLandingPage);
landingPageRouter.patch('/', updateLandingPage);

export default landingPageRouter;