import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { sessionService } from '../services/sessionService';
import { AuthResponse, RegisterRequest, LoginRequest, LogoutRequest } from '../types';
import { logger } from '../shared/logger';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body as RegisterRequest;
      const { user, token } = await userService.register(email, password, name);
      logger.info(`User registered: ${user.id}`);
      const response: AuthResponse = { user, token };
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as LoginRequest;
      const { user, token } = await userService.login(email, password);
      logger.info(`User logged in: ${user.id}`);
      const response: AuthResponse = { user, token };
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body as LogoutRequest;
      await sessionService.logout(token);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
};
