import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email()
});

export const shiftSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  startTime: z.date(),
  endTime: z.date()
});

export const createEmployeeSchema = z.object({
  name: z.string(),
  email: z.string().email()
});

export const createShiftSchema = z.object({
  employeeId: z.string(),
  startTime: z.date(),
  endTime: z.date()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
});
