import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  updatePassword,
  restoreUser
} from '../controllers/userController';

const userRouter: Router = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/password/:id', updatePassword);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

userRouter.patch('/restore/:id', restoreUser);

export default userRouter;