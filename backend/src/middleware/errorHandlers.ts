import { Request, Response, NextFunction } from 'express';
import { logWithTimestamp } from '../utils/logger';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logWithTimestamp(`Error: ${err.message || err}`);
  res.status(500).json({ error: 'Internal Server Error' });
};
