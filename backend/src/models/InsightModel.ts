import { v4 as uuidv4 } from 'uuid';

export const insightStore = new Map<string, Insight>();

export interface Insight {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInsightInput {
  title: string;
  content: string;
}

export interface UpdateInsightInput {
  title?: string;
  content?: string;
}
