import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact
} from '../controllers/contactController';

const contactRouter: Router = Router();

contactRouter.get('/', getAllContacts);

contactRouter.get('/:id', getContactById);

contactRouter.post('/', createContact);

contactRouter.patch('/:id', updateContact);

contactRouter.delete('/:id', deleteContact);

export default contactRouter;