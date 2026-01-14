import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';
import { z } from 'zod';
import { logger } from '../utils/logger';

const createBookingSchema = z.object({
  courtId: z.string().uuid(),
  startTime: z.string(),
  endTime: z.string()
});
const updateBookingSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  status: z.enum(['active', 'cancelled', 'completed']).optional()
});

function parseDateTime(s: string) {
  const d = new Date(s);
  if (isNaN(d.getTime())) throw new Error('Invalid date');
  return d;
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, courtId, status, dateRange } = req.query;
    const where: any = {};
    if (userId) where.userId = userId;
    if (courtId) where.courtId = courtId;
    if (status) where.status = status;
    if (dateRange) {
      const dr = typeof dateRange === 'string' ? JSON.parse(dateRange) : dateRange;
      if (dr.from) where.startTime = { gte: dr.from };
      if (dr.to) where.endTime = { lte: dr.to };
    }
    const bookings = await prisma.booking.findMany({ where });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const data = createBookingSchema.parse(req.body);
    const startTime = parseDateTime(data.startTime);
    const endTime = parseDateTime(data.endTime);
    if (endTime <= startTime) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }
    // Prevent overlapping bookings
    const overlap = await prisma.booking.findFirst({
      where: {
        courtId: data.courtId,
        status: 'active',
        OR: [
          {
            startTime: { lt: endTime.toISOString() },
            endTime: { gt: startTime.toISOString() }
          }
        ]
      }
    });
    if (overlap) {
      return res.status(409).json({ error: 'Court already booked for this time' });
    }
    const booking = await prisma.booking.create({
      data: {
        userId,
        courtId: data.courtId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: 'active'
      }
    });
    logger.info(`Booking created: ${booking.id}`);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = updateBookingSchema.parse(req.body);
    if (data.startTime && data.endTime) {
      const startTime = parseDateTime(data.startTime);
      const endTime = parseDateTime(data.endTime);
      if (endTime <= startTime) {
        return res.status(400).json({ error: 'End time must be after start time' });
      }
      // Prevent overlapping bookings
      const overlap = await prisma.booking.findFirst({
        where: {
          courtId: (await prisma.booking.findUnique({ where: { id } }))?.courtId,
          status: 'active',
          id: { not: id },
          OR: [
            {
              startTime: { lt: endTime.toISOString() },
              endTime: { gt: startTime.toISOString() }
            }
          ]
        }
      });
      if (overlap) {
        return res.status(409).json({ error: 'Court already booked for this time' });
      }
    }
    const booking = await prisma.booking.update({ where: { id }, data });
    logger.info(`Booking updated: ${id}`);
    res.json(booking);
  } catch (err) {
    next(err);
  }
}

export async function cancel(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.booking.update({ where: { id }, data: { status: 'cancelled' } });
    logger.info(`Booking cancelled: ${id}`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
