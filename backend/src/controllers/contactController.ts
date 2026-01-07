import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { contacts } from '../models/contact';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

const contactCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().min(1)
});
const contactUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional()
});

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { page = 1, pageSize = 20, search = '' } = req.query;
    let filtered = contacts.filter(c => c.ownerId === userId);
    if (search && typeof search === 'string') {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
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

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = contactCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid contact payload' });
    }
    const userId = req.user.id;
    const now = new Date();
    const contact = {
      id: uuidv4(),
      ...parsed.data,
      ownerId: userId,
      createdAt: now,
      updatedAt: now
    };
    contacts.push(contact);
    logger.info(`Contact created: ${contact.id} by user ${userId}`);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const contact = contacts.find(c => c.id === req.params.id && c.ownerId === userId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
}

export async function updateContact(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = contactUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid contact update payload' });
    }
    const userId = req.user.id;
    const contact = contacts.find(c => c.id === req.params.id && c.ownerId === userId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    Object.assign(contact, parsed.data, { updatedAt: new Date() });
    logger.info(`Contact updated: ${contact.id} by user ${userId}`);
    res.json(contact);
  } catch (err) {
    next(err);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const idx = contacts.findIndex(c => c.id === req.params.id && c.ownerId === userId);
    if (idx === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    contacts.splice(idx, 1);
    logger.info(`Contact deleted: ${req.params.id} by user ${userId}`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
