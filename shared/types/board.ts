// Board and Column types
import type { ID } from './common';
import type { Column } from './column';

export type Board = {
  id: ID;
  projectId: ID;
  name: string;
  columns: Column[];
};
