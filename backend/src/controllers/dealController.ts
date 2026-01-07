import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client';

const dealCreateSchema = z.object({
  title: z.string().min(1),
  value: z.number(),
  stage: z.string().min(1),
  contactId: z.string().uuid().optional()
});

const dealUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  value: z.number().optional(),
  stage: z.string().min(1).optional(),
  contactId: z.string().uuid().optional().nullable()
});

export async function listDeals(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { stage, contactId, page = 1, pageSize = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);
    const where: any = { userId };
    if (stage) where.stage = stage;
    if (contactId) where.contactId = contactId;
    const [deals, total] = await Promise.all([
      prisma.deal.findMany({ where, skip, take: Number(pageSize), orderBy: { createdAt: 'desc' } }),
      prisma.deal.count({ where })
    ]);
    res.json({
      data: deals,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (err) {
    next(err);
  }
}

export async function createDeal(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const data = dealCreateSchema.parse(req.body);
    const deal = await prisma.deal.create({
      data: { ...data, userId }
    });
    res.status(201).json(deal);
  } catch (err) {
    next(err);
  }
}

export async function getDeal(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const deal = await prisma.deal.findFirst({ where: { id, userId } });
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (err) {
    next(err);
  }
}

export async function updateDeal(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const data = dealUpdateSchema.parse(req.body);
    const deal = await prisma.deal.findFirst({ where: { id, userId } });
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    const updated = await prisma.deal.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteDeal(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const deal = await prisma.deal.findFirst({ where: { id, userId } });
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    await prisma.deal.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
