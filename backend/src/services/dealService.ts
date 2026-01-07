import { v4 as uuidv4 } from 'uuid';
import { Deal } from '../types/entities';

const deals: Deal[] = [];

export async function listDeals(userId: string, page: number, pageSize: number, search: string, stage: string): Promise<{ deals: Deal[]; total: number }> {
  let filtered = deals.filter(d => d.userId === userId);
  if (search) {
    filtered = filtered.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));
  }
  if (stage) {
    filtered = filtered.filter(d => d.stage === stage);
  }
  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  return { deals: paged, total };
}

export async function createDeal(userId: string, data: { title: string; value: number; stage: string }): Promise<Deal> {
  const now = new Date();
  const deal: Deal = {
    id: uuidv4(),
    userId,
    title: data.title,
    value: data.value,
    stage: data.stage,
    createdAt: now,
    updatedAt: now
  };
  deals.push(deal);
  return deal;
}

export async function getDeal(userId: string, id: string): Promise<Deal | undefined> {
  return deals.find(d => d.id === id && d.userId === userId);
}

export async function updateDeal(userId: string, id: string, data: Partial<{ title: string; value: number; stage: string }>): Promise<Deal | undefined> {
  const deal = deals.find(d => d.id === id && d.userId === userId);
  if (!deal) return undefined;
  if (data.title !== undefined) deal.title = data.title;
  if (data.value !== undefined) deal.value = data.value;
  if (data.stage !== undefined) deal.stage = data.stage;
  deal.updatedAt = new Date();
  return deal;
}

export async function deleteDeal(userId: string, id: string): Promise<boolean> {
  const idx = deals.findIndex(d => d.id === id && d.userId === userId);
  if (idx === -1) return false;
  deals.splice(idx, 1);
  return true;
}
