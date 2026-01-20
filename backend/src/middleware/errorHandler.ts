import { Request, Response, NextFunction } from 'express';
import { logWithTimestamp } from '../utils/logger';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logWithTimestamp('Error: ' + (err.message || err));
  res.status(500).json({ error: 'Internal server error' });
}
