import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ message: 'Not Found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  logger.error(`[${req.method}] ${req.url} - ${status}: ${message}`);
  res.status(status).json({ message });
}
