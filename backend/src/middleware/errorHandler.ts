import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.errors });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}
