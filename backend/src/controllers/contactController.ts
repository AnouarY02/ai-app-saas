import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as contactModel from '../models/contactModel';
import { PaginatedResult } from '../types/entities';

const contactCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

const contactUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { search = '', page = 1, pageSize = 20 } = req.query;
    const result: PaginatedResult<any> = await contactModel.listContacts({
      userId,
      search: String(search),
      page: Number(page),
      pageSize: Number(pageSize),
    });
    res.json(result);
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
    const contact = await contactModel.createContact({ ...parsed.data, userId });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const contact = await contactModel.getContactById(id, userId);
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
    const { id } = req.params;
    const updated = await contactModel.updateContact(id, userId, parsed.data);
    if (!updated) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await contactModel.deleteContact(id, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
