import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as dealService from '../services/dealService';
import { logWithTimestamp } from '../utils/logger';

const dealCreateSchema = z.object({
  title: z.string().min(1),
  value: z.number(),
  stage: z.string().min(1)
});
const dealUpdateSchema = z.object({
  title: z.string().optional(),
  value: z.number().optional(),
  stage: z.string().optional()
});

export async function listDeals(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1, pageSize = 20, search = '', stage = '' } = req.query;
    const userId = req.user.id;
    const { deals, total } = await dealService.listDeals(userId, Number(page), Number(pageSize), String(search), String(stage));
    res.json({ deals, total });
  } catch (err) {
    next(err);
  }
}

export async function createDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = dealCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid deal payload' });
    }
    const userId = req.user.id;
    const deal = await dealService.createDeal(userId, parsed.data);
    logWithTimestamp(`Deal created: ${deal.id}`);
    res.status(201).json(deal);
  } catch (err) {
    next(err);
  }
}

export async function getDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deal = await dealService.getDeal(userId, id);
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
    const { id } = req.params;
    const parsed = dealUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid deal update payload' });
    }
    const userId = req.user.id;
    const updated = await dealService.updateDeal(userId, id, parsed.data);
    if (!updated) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    logWithTimestamp(`Deal updated: ${id}`);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await dealService.deleteDeal(userId, id);
    if (!deleted) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    logWithTimestamp(`Deal deleted: ${id}`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
