import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Not Found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(`[${new Date().toISOString()}]`, err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
}
