import { Router } from 'express';
import { registerController, loginController } from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);