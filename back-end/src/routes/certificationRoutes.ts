import { Router } from 'express';
import {
  createCertification,
  deleteCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  restoreCertification
} from '../controllers/certificationController';
import { unverifiedCheck } from '../middlewares/authMiddleware';

const certificationRouter: Router = Router();

certificationRouter.use(unverifiedCheck);

certificationRouter.get('/', getAllCertifications);

certificationRouter.get('/:id', getCertificationById);

certificationRouter.post('/', createCertification);

certificationRouter.patch('/:id', updateCertification);

certificationRouter.delete('/:id', deleteCertification);

certificationRouter.patch('/restore/:id', restoreCertification);

export default certificationRouter;