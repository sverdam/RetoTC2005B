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
import { unverifiedCheck } from '../middlewares/authMiddleware';

const userRouter: Router = Router();

userRouter.use(unverifiedCheck);

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/password/:id', updatePassword);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

userRouter.patch('/restore/:id', restoreUser);

export default userRouter;