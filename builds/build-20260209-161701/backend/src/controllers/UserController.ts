import { Request, Response, NextFunction } from 'express';
import { UserService } from '@/services/UserService';
import { createUserSchema, updateUserSchema } from '@/validators/userValidators';
import { z } from 'zod';

const userService = new UserService();

export class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createUserSchema.parse(req.body);
      const user = await userService.create(input);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = updateUserSchema.parse(req.body);
      const user = await userService.update(req.params.id, input);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const success = await userService.delete(req.params.id);
      if (!success) return res.status(404).json({ message: 'User not found' });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
