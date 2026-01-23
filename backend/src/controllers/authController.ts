import { Request, Response, NextFunction } from 'express';
import { validateLoginRequest } from '../validators/authValidators';
import { findUserByEmail, verifyPassword } from '../services/userService';
import { signJwt, getUserProfileFromUser } from '../services/jwtService';
import { ApiError } from '../types/api';

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = validateLoginRequest(req.body);
    if (error) {
      return res.status(400).json({ error: 'Invalid login payload' });
    }
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.hashed_password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (!user.is_active) {
      return res.status(403).json({ error: 'User is inactive' });
    }
    const userProfile = getUserProfileFromUser(user);
    const access_token = signJwt(userProfile);
    res.json({ access_token, token_type: 'bearer', user: userProfile });
  } catch (err) {
    next(err);
  }
}

export async function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    // Stateless JWT: logout is handled client-side by deleting token
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userProfile = req.user;
    res.json(userProfile);
  } catch (err) {
    next(err);
  }
}
