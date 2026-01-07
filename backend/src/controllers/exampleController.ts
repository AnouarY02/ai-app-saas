// Example controller for future expansion
import { Request, Response } from 'express';

export const exampleHandler = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Example endpoint' });
};
