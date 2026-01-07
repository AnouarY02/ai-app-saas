import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    logger.warn('Validation error', { errors: err.errors });
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }
  if (err.status && err.message) {
    logger.warn('Handled error', { status: err.status, message: err.message });
    return res.status(err.status).json({ error: err.message });
  }
  logger.error('Internal server error', { error: err });
  res.status(500).json({ error: 'Internal server error' });
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Not found' });
}
