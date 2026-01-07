import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as dealModel from '../models/dealModel';
import { PaginatedResult } from '../types/entities';

const dealCreateSchema = z.object({
  title: z.string().min(1),
  value: z.number(),
  stage: z.string().min(1),
  contactId: z.string().uuid(),
});

const dealUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  value: z.number().optional(),
  stage: z.string().min(1).optional(),
  contactId: z.string().uuid().optional(),
});

export async function listDeals(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { stage, contactId, page = 1, pageSize = 20 } = req.query;
    const result: PaginatedResult<any> = await dealModel.listDeals({
      userId,
      stage: stage ? String(stage) : undefined,
      contactId: contactId ? String(contactId) : undefined,
      page: Number(page),
      pageSize: Number(pageSize),
    });
    res.json(result);
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
    const deal = await dealModel.createDeal({ ...parsed.data, userId });
    res.status(201).json(deal);
  } catch (err) {
    next(err);
  }
}

export async function getDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deal = await dealModel.getDealById(id, userId);
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
    const parsed = dealUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid deal update payload' });
    }
    const userId = req.user.id;
    const { id } = req.params;
    const updated = await dealModel.updateDeal(id, userId, parsed.data);
    if (!updated) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await dealModel.deleteDeal(id, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
