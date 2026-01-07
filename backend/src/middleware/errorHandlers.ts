import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types/api';
import { logWithTimestamp } from '../utils/logger';

export function notFoundHandler(req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  res.status(404).json({ error: 'Not Found', status: 404 });
}

export function errorHandler(err: any, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  logWithTimestamp(`Error: ${err.message || err}`);
  res.status(500).json({ error: 'Internal Server Error', status: 500 });
}
