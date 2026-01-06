import { v4 as uuidv4 } from 'uuid';
import { AIRequest } from '../types';

const aiRequests: AIRequest[] = [];

export const aiRequestService = {
  async createAIRequest(userId: string, input: string): Promise<AIRequest> {
    // Simulate AI output
    const output = `Echo: ${input}`;
    const now = new Date();
    const aiRequest: AIRequest = {
      id: uuidv4(),
      userId,
      input,
      output,
      status: 'completed',
      createdAt: now,
      updatedAt: now
    };
    aiRequests.push(aiRequest);
    return aiRequest;
  },
  async listByUser(userId: string): Promise<AIRequest[]> {
    return aiRequests.filter(r => r.userId === userId);
  },
  async getById(id: string): Promise<AIRequest | undefined> {
    return aiRequests.find(r => r.id === id);
  }
};
