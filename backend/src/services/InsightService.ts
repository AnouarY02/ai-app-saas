import { insightStore, Insight, CreateInsightInput, UpdateInsightInput } from '../models/InsightModel';
import { v4 as uuidv4 } from 'uuid';

export class InsightService {
  async findAll(): Promise<Insight[]> {
    return Array.from(insightStore.values());
  }

  async findById(id: string): Promise<Insight | null> {
    return insightStore.get(id) || null;
  }

  async create(input: CreateInsightInput): Promise<Insight> {
    const id = uuidv4();
    const now = new Date().toISOString();
    const insight: Insight = { id, ...input, createdAt: now, updatedAt: now };
    insightStore.set(id, insight);
    return insight;
  }

  async update(id: string, input: UpdateInsightInput): Promise<Insight | null> {
    const insight = insightStore.get(id);
    if (!insight) return null;
    const updatedInsight = { ...insight, ...input, updatedAt: new Date().toISOString() };
    insightStore.set(id, updatedInsight);
    return updatedInsight;
  }

  async delete(id: string): Promise<boolean> {
    return insightStore.delete(id);
  }
}
