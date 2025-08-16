import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Server error' });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({
      success: true,
      message: 'User logged in successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Server error' });
  }
};