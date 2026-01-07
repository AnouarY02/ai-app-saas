import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logError('API Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};
