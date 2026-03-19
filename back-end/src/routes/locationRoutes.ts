import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from '../controllers/userController';

const userRouter: Router = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/:id', updateUser);

userRouter.delete('/', deleteUser);

export default userRouter;