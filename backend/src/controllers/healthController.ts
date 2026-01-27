import { Request, Response, NextFunction } from 'express';

export const getHealth = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
};
