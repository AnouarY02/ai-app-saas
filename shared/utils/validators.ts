// Data validation schemas using zod
import { z } from 'zod';
import { BookingStatuses } from '../types/bookingStatus';
import { Roles } from '../types/roles';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export const updateUserRequestSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum([Roles.USER, Roles.ADMIN]).optional(),
});

export const createCourtRequestSchema = z.object({
  name: z.string().min(1),
  location: z.string().optional(),
  surfaceType: z.string().optional(),
});

export const updateCourtRequestSchema = z.object({
  name: z.string().min(1).optional(),
  location: z.string().optional(),
  surfaceType: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const createBookingRequestSchema = z.object({
  courtId: z.string().uuid(),
  startTime: z.string().refine((v) => !isNaN(Date.parse(v)), {
    message: 'Invalid startTime',
  }),
  endTime: z.string().refine((v) => !isNaN(Date.parse(v)), {
    message: 'Invalid endTime',
  }),
});

export const updateBookingRequestSchema = z.object({
  startTime: z.string().refine((v) => !isNaN(Date.parse(v)), {
    message: 'Invalid startTime',
  }).optional(),
  endTime: z.string().refine((v) => !isNaN(Date.parse(v)), {
    message: 'Invalid endTime',
  }).optional(),
  status: z.enum([
    BookingStatuses.ACTIVE,
    BookingStatuses.CANCELLED,
    BookingStatuses.COMPLETED,
  ]).optional(),
});

export const bookingQuerySchema = z.object({
  userId: z.string().uuid().optional(),
  courtId: z.string().uuid().optional(),
  status: z.enum([
    BookingStatuses.ACTIVE,
    BookingStatuses.CANCELLED,
    BookingStatuses.COMPLETED,
  ]).optional(),
  dateRange: z
    .object({
      from: z.string().refine((v) => !isNaN(Date.parse(v)), {
        message: 'Invalid from date',
      }),
      to: z.string().refine((v) => !isNaN(Date.parse(v)), {
        message: 'Invalid to date',
      }),
    })
    .optional(),
});
