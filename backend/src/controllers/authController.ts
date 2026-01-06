import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { sessionService } from '../services/sessionService';
import { logger } from '../utils/logger';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await userService.verifyPassword(user, password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const session = await sessionService.createSession(user.id);
    logger.info(`User ${user.id} logged in`);
    res.status(200).json({
      token: session.token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.body.token || req.token;
    if (!token) {
      return res.status(400).json({ error: 'Missing session token' });
    }
    await sessionService.invalidateSession(token);
    logger.info(`Session logged out: ${token}`);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function checkSession(req: Request, res: Response, next: NextFunction) {
  try {
    const session = req.session;
    if (!session) {
      return res.status(401).json({ valid: false });
    }
    const user = await userService.findById(session.userId);
    if (!user) {
      return res.status(401).json({ valid: false });
    }
    res.status(200).json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    next(err);
  }
}
