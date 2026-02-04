import { Request, Response, NextFunction } from 'express';
import { UserService } from '@/services/UserService';
import { createUserSchema, updateUserSchema } from '@/validators/userValidators';

export const UserController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAll();
      res.json({ data: users });
    } catch (error) {
      next(error);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createUserSchema.parse(req.body);
      const user = await UserService.create(validated);
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = updateUserSchema.parse(req.body);
      const user = await UserService.update(req.params.id, validated);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await UserService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'User not found' });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};