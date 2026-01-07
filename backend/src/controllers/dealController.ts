import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { deals } from '../models/deal';
import { contacts } from '../models/contact';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

const dealCreateSchema = z.object({
  title: z.string().min(1),
  value: z.number().min(0),
  stage: z.string().min(1),
  contactId: z.string().uuid()
});
const dealUpdateSchema = z.object({
  title: z.string().optional(),
  value: z.number().min(0).optional(),
  stage: z.string().optional(),
  contactId: z.string().uuid().optional()
});

export async function listDeals(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { page = 1, pageSize = 20, stage, contactId } = req.query;
    let filtered = deals.filter(d => d.ownerId === userId);
    if (stage && typeof stage === 'string') {
      filtered = filtered.filter(d => d.stage === stage);
    }
    if (contactId && typeof contactId === 'string') {
      filtered = filtered.filter(d => d.contactId === contactId);
    }
    const total = filtered.length;
    const start = ((+page) - 1) * (+pageSize);
    const paginated = filtered.slice(start, start + (+pageSize));
    res.json({
      data: paginated,
      total,
      page: +page,
      pageSize: +pageSize
    });
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
    const { contactId } = parsed.data;
    const contact = contacts.find(c => c.id === contactId && c.ownerId === userId);
    if (!contact) {
      return res.status(400).json({ error: 'Contact not found or not owned by user' });
    }
    const now = new Date();
    const deal = {
      id: uuidv4(),
      ...parsed.data,
      ownerId: userId,
      createdAt: now,
      updatedAt: now
    };
    deals.push(deal);
    logger.info(`Deal created: ${deal.id} by user ${userId}`);
    res.status(201).json(deal);
  } catch (err) {
    next(err);
  }
}

export async function getDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const deal = deals.find(d => d.id === req.params.id && d.ownerId === userId);
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
    const deal = deals.find(d => d.id === req.params.id && d.ownerId === userId);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    if (parsed.data.contactId) {
      const contact = contacts.find(c => c.id === parsed.data.contactId && c.ownerId === userId);
      if (!contact) {
        return res.status(400).json({ error: 'Contact not found or not owned by user' });
      }
    }
    Object.assign(deal, parsed.data, { updatedAt: new Date() });
    logger.info(`Deal updated: ${deal.id} by user ${userId}`);
    res.json(deal);
  } catch (err) {
    next(err);
  }
}

export async function deleteDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const idx = deals.findIndex(d => d.id === req.params.id && d.ownerId === userId);
    if (idx === -1) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    deals.splice(idx, 1);
    logger.info(`Deal deleted: ${req.params.id} by user ${userId}`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
