import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshRequestSchema = z.object({
  token: z.string()
});

export const logoutRequestSchema = z.object({
  token: z.string()
});

export const listWeatherDataRequestSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getWeatherDataRequestSchema = z.object({
  id: z.string()
});

export const createWeatherDataRequestSchema = z.object({
  location: z.string(),
  temperature: z.number(),
  condition: z.string(),
  forecast: z.any()
});

export const updateWeatherDataRequestSchema = z.object({
  id: z.string(),
  location: z.string().optional(),
  temperature: z.number().optional(),
  condition: z.string().optional(),
  forecast: z.any().optional()
});

export const deleteWeatherDataRequestSchema = z.object({
  id: z.string()
});