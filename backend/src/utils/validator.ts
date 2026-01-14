import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1)
});

export const updateUserRequestSchema = z.object({
  name: z.string().optional(),
  role: z.enum(['user', 'admin']).optional()
});

export const createCourtRequestSchema = z.object({
  name: z.string().min(1),
  location: z.string().optional(),
  surfaceType: z.string().optional()
});

export const updateCourtRequestSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  surfaceType: z.string().optional(),
  isActive: z.boolean().optional()
});

export const createBookingRequestSchema = z.object({
  courtId: z.string().uuid(),
  startTime: z.string(),
  endTime: z.string()
});

export const updateBookingRequestSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  status: z.enum(['active', 'cancelled', 'completed']).optional()
});

export const bookingQuerySchema = z.object({
  userId: z.string().uuid().optional(),
  courtId: z.string().uuid().optional(),
  status: z.enum(['active', 'cancelled', 'completed']).optional(),
  dateRange: z.object({
    from: z.string().optional(),
    to: z.string().optional()
  }).optional()
});
