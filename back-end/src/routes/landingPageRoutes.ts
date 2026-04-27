import { Router } from 'express';
import { getLandingPage, updateLandingPage } from '../controllers/landingPageController';

const landingPageRouter: Router = Router();

landingPageRouter.get('/', getLandingPage);
landingPageRouter.patch('/', updateLandingPage);

export default landingPageRouter;