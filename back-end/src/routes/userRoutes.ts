import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  updatePassword
} from '../controllers/userController';

const userRouter: Router = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/password/:id', updatePassword);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;