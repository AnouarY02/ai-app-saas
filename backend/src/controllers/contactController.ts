import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as contactService from '../services/contactService';
import { logWithTimestamp } from '../utils/logger';

const contactCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1)
});
const contactUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional()
});

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1, pageSize = 20, search = '' } = req.query;
    const userId = req.user.id;
    const { contacts, total } = await contactService.listContacts(userId, Number(page), Number(pageSize), String(search));
    res.json({ contacts, total });
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
    const contact = await contactService.createContact(userId, parsed.data);
    logWithTimestamp(`Contact created: ${contact.id}`);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const contact = await contactService.getContact(userId, id);
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
    const { id } = req.params;
    const parsed = contactUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid contact update payload' });
    }
    const userId = req.user.id;
    const updated = await contactService.updateContact(userId, id, parsed.data);
    if (!updated) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    logWithTimestamp(`Contact updated: ${id}`);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await contactService.deleteContact(userId, id);
    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    logWithTimestamp(`Contact deleted: ${id}`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
