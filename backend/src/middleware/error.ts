import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';
import { logger } from '../utils/logger';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Not Found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    logger.warn(`API error: ${err.message}`);
    res.status(err.statusCode).json({ error: err.message, details: err.details });
  } else {
    logger.error('Unhandled error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
