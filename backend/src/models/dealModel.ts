import { v4 as uuidv4 } from 'uuid';
import { Deal, DealCreate, DealUpdate, PaginatedResult } from '../types/entities';

let deals: Deal[] = [];

export async function listDeals({ userId, stage, contactId, page = 1, pageSize = 20 }: { userId: string; stage?: string; contactId?: string; page?: number; pageSize?: number; }): Promise<PaginatedResult<Deal>> {
  let filtered = deals.filter((d) => d.userId === userId);
  if (stage) filtered = filtered.filter((d) => d.stage === stage);
  if (contactId) filtered = filtered.filter((d) => d.contactId === contactId);
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  return {
    items: paged,
    total,
    page,
    pageSize,
  };
}

export async function createDeal(data: DealCreate & { userId: string }): Promise<Deal> {
  const now = new Date();
  const deal: Deal = {
    id: uuidv4(),
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  deals.push(deal);
  return deal;
}

export async function getDealById(id: string, userId: string): Promise<Deal | undefined> {
  return deals.find((d) => d.id === id && d.userId === userId);
}

export async function updateDeal(id: string, userId: string, update: DealUpdate): Promise<Deal | undefined> {
  const idx = deals.findIndex((d) => d.id === id && d.userId === userId);
  if (idx === -1) return undefined;
  deals[idx] = {
    ...deals[idx],
    ...update,
    updatedAt: new Date(),
  };
  return deals[idx];
}

export async function deleteDeal(id: string, userId: string): Promise<boolean> {
  const idx = deals.findIndex((d) => d.id === id && d.userId === userId);
  if (idx === -1) return false;
  deals.splice(idx, 1);
  return true;
}

export async function getDealMetrics(userId: string): Promise<{ totalDeals: number; dealsByStage: Record<string, number>; totalDealValue: number; }> {
  const userDeals = deals.filter((d) => d.userId === userId);
  const totalDeals = userDeals.length;
  const dealsByStage: Record<string, number> = {};
  let totalDealValue = 0;
  for (const d of userDeals) {
    dealsByStage[d.stage] = (dealsByStage[d.stage] || 0) + 1;
    totalDealValue += d.value;
  }
  return { totalDeals, dealsByStage, totalDealValue };
}
