import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ApiError } from '../utils/errors';

export function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(e => ({ field: e.path.join('.'), message: e.message }));
      return next(new ApiError(400, 'Validation error', errors));
    }
    next();
  };
}
