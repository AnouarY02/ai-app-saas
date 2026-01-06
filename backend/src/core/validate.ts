import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { BadRequestError } from './errorTypes';

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new BadRequestError(result.error.errors.map(e => e.message).join(', ')));
    }
    req.body = result.data;
    next();
  };
}
