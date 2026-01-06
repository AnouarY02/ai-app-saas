// Centralized error and 404 handlers
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errorTypes';

export function notFoundHandler(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ ok: false, error: 'Not Found' });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ ok: false, error: err.message });
  } else {
    // eslint-disable-next-line no-console
    console.error('[ERROR]', err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
}
