import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client';

const contactCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional()
});

const contactUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional()
});

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { search = '', page = 1, pageSize = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);
    const where: any = { userId };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ];
    }
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({ where, skip, take: Number(pageSize), orderBy: { createdAt: 'desc' } }),
      prisma.contact.count({ where })
    ]);
    res.json({
      data: contacts,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (err) {
    next(err);
  }
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const data = contactCreateSchema.parse(req.body);
    const contact = await prisma.contact.create({
      data: { ...data, userId }
    });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const contact = await prisma.contact.findFirst({ where: { id, userId } });
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
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const data = contactUpdateSchema.parse(req.body);
    const contact = await prisma.contact.findFirst({ where: { id, userId } });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    const updated = await prisma.contact.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const contact = await prisma.contact.findFirst({ where: { id, userId } });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    await prisma.contact.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
