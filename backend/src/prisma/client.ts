import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.PRISMA_LOG_QUERIES === 'true' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error']
});
