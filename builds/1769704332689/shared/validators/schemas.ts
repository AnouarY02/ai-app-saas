import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1)
});

export const refreshTokenRequestSchema = z.object({
  token: z.string()
});

export const logoutRequestSchema = z.object({
  token: z.string()
});

export const getUserRequestSchema = z.object({
  id: z.string().uuid()
});

export const updateUserRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional()
});

export const listLocationsRequestSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const createLocationRequestSchema = z.object({
  name: z.string().min(1),
  latitude: z.number(),
  longitude: z.number()
});

export const getLocationRequestSchema = z.object({
  id: z.string().uuid()
});

export const updateLocationRequestSchema = z.object({
  name: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
});

export const deleteLocationRequestSchema = z.object({
  id: z.string().uuid()
});