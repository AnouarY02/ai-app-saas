import { Request, Response, NextFunction } from 'express';

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
};
