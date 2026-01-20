// Column type
import type { ID } from './common';

export type Column = {
  id: ID;
  name: string;
  taskIds: ID[];
};
