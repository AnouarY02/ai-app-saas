import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';
import { z } from 'zod';
import { logger } from '../utils/logger';

const updateUserSchema = z.object({
  name: z.string().optional(),
  role: z.enum(['user', 'admin']).optional()
});

function toUserPublic(user: any) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(toUserPublic(user));
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();
    res.json(users.map(toUserPublic));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = updateUserSchema.parse(req.body);
    // Only admin can update role
    if (data.role && (req as any).user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const user = await prisma.user.update({ where: { id }, data });
    logger.info(`User updated: ${id}`);
    res.json(toUserPublic(user));
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    logger.info(`User deleted: ${id}`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
