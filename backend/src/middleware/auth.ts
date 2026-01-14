import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    (req as any).user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

export function requireAdminOrSelf(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user.role === 'admin' || user.id === req.params.id) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden' });
}

export async function requireBookingOwnerOrAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  const bookingId = req.params.id;
  if (user.role === 'admin') return next();
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (booking.userId !== user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}
