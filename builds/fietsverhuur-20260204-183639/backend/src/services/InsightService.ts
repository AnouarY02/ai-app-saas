import { insightStore } from '@/models/InsightModel';
import { v4 as uuid } from 'uuid';

export const InsightService = {
  async findAll(): Promise<Insight[]> {
    return Array.from(insightStore.values());
  },

  async findById(id: string): Promise<Insight | null> {
    return insightStore.get(id) || null;
  },

  async create(input: CreateInsightInput): Promise<Insight> {
    const insight: Insight = {
      id: uuid(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    insightStore.set(insight.id, insight);
    return insight;
  },

  async update(id: string, input: UpdateInsightInput): Promise<Insight | null> {
    const existing = insightStore.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...input };
    insightStore.set(id, updated);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    return insightStore.delete(id);
  },
};