import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err);
  if (res.headersSent) {
    return next(err);
  }
  if (err.status && err.message) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
}
