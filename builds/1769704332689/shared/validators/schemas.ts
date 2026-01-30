import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshTokenSchema = z.object({
  token: z.string()
});

export const logoutSchema = z.object({
  token: z.string()
});

export const listWeatherDataSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getWeatherDataSchema = z.object({
  id: z.string().uuid()
});

export const createWeatherDataSchema = z.object({
  userId: z.string().uuid(),
  location: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  forecast: z.any()
});

export const updateWeatherDataSchema = z.object({
  id: z.string().uuid(),
  location: z.string().optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  forecast: z.any().optional()
});

export const deleteWeatherDataSchema = z.object({
  id: z.string().uuid()
});