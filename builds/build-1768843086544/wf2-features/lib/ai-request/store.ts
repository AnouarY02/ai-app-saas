import { v4 as uuidv4 } from "uuid";

export type AIRequest = {
  id: string;
  userId: string;
  prompt: string;
  result?: string;
  createdAt: string;
};

type NewAIRequest = {
  userId: string;
  prompt: string;
};

class AIRequestStore {
  private requests: AIRequest[] = [];

  getByUser(userId: string): AIRequest[] {
    return this.requests.filter((r) => r.userId === userId);
  }

  create({ userId, prompt }: NewAIRequest): AIRequest {
    const req: AIRequest = {
      id: uuidv4(),
      userId,
      prompt,
      createdAt: new Date().toISOString(),
      result: undefined
    };
    this.requests.push(req);
    return req;
  }

  // Andere CRUD-methodes indien nodig
}

export const aiRequestStore = new AIRequestStore();
