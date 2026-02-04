export interface Insight {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface CreateInsightInput {
  userId: string;
  content: string;
}

export interface UpdateInsightInput {
  content?: string;
}

export const insightStore = new Map<string, Insight>();