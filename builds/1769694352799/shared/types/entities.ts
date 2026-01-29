export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};