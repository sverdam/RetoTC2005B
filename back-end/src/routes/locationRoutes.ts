import { Router } from 'express';
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  getLocationById,
  updateLocation
} from '../controllers/locationController';

const locationRouter: Router = Router();

locationRouter.get('/', getAllLocations);

locationRouter.get('/:id', getLocationById);

locationRouter.post('/', createLocation);

locationRouter.patch('/:id', updateLocation);

locationRouter.delete('/:id', deleteLocation);

export default locationRouter;