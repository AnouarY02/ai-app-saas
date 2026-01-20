// Activity type
import type { ID } from './common';

export type Activity = {
  id: ID;
  projectId: ID;
  actorId: ID;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string; // ISO string
};
