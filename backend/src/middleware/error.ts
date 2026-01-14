import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Not Found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.stack || err.message || err);
  if (err.name === 'ZodError') {
    return res.status(400).json({ error: err.errors });
  }
  res.status(500).json({ error: 'Internal Server Error' });
}
