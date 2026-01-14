import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';
import { z } from 'zod';
import { logger } from '../utils/logger';

const createCourtSchema = z.object({
  name: z.string().min(1),
  location: z.string().optional(),
  surfaceType: z.string().optional()
});
const updateCourtSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  surfaceType: z.string().optional(),
  isActive: z.boolean().optional()
});

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const courts = await prisma.court.findMany();
    res.json(courts);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createCourtSchema.parse(req.body);
    const court = await prisma.court.create({ data });
    logger.info(`Court created: ${court.id}`);
    res.status(201).json(court);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = updateCourtSchema.parse(req.body);
    const court = await prisma.court.update({ where: { id }, data });
    logger.info(`Court updated: ${id}`);
    res.json(court);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.court.delete({ where: { id } });
    logger.info(`Court deleted: ${id}`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
