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
  userId: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};