// Project entity type
import type { ID } from './common';

export type Project = {
  id: ID;
  name: string;
  description: string;
  teamId: ID;
  createdAt: string; // ISO string
};
