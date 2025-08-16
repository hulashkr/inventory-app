import { User } from '../models/User';
import { generateToken } from '../utils/tokenUtils';

export const registerUser = async (data: { name: string; email: string; password: string; role: string }) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error('Email already exists');

  const user = await User.create(data);
  const token = generateToken(user._id.toString(), user.role);

  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken(user._id.toString(), user.role);
  return { user, token };
};