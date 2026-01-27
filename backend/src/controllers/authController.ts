import { Request, Response, NextFunction } from 'express';
import { registerUserSchema, loginUserSchema, refreshTokenSchema, logoutUserSchema } from '../validators/authValidators';
import { createUser, authenticateUser, refreshUserToken, invalidateUserSession } from '../services/authService';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerUserSchema.parse(req.body);
    const result = await createUser(data);
    res.json({ data: result, meta: {} });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginUserSchema.parse(req.body);
    const result = await authenticateUser(data);
    res.json({ data: result, meta: {} });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = refreshTokenSchema.parse(req.body);
    const result = await refreshUserToken(data);
    res.json({ data: result, meta: {} });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = logoutUserSchema.parse(req.body);
    await invalidateUserSession(data);
    res.json({ data: { success: true }, meta: {} });
  } catch (error) {
    next(error);
  }
};