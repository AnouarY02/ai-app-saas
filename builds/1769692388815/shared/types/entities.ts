export type User = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};