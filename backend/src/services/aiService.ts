import { v4 as uuidv4 } from 'uuid';
import { db } from '../models/inMemoryDb';
import { AIInteraction } from '../models/types';

export const aiService = {
  async create(data: { userId: string; input: string; output: string }): Promise<AIInteraction> {
    const now = new Date();
    const interaction: AIInteraction = {
      id: uuidv4(),
      userId: data.userId,
      input: data.input,
      output: data.output,
      createdAt: now,
    };
    db.aiInteractions.set(interaction.id, interaction);
    return interaction;
  },

  async listByUser(userId: string, limit: number, offset: number): Promise<AIInteraction[]> {
    const all = Array.from(db.aiInteractions.values()).filter(i => i.userId === userId);
    all.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return all.slice(offset, offset + limit);
  },
};
