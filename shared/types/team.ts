// Team entity type
import type { ID } from './common';
import type { User } from './user';

export type Team = {
  id: ID;
  name: string;
  members: User[];
};
