export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type Board = {
  id: string;
  title: string;
  ownerId: string;
  createdAt: string;
};

export type Column = {
  id: string;
  boardId: string;
  title: string;
  order: number;
};

export type Task = {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  order: number;
  createdAt: string;
};

