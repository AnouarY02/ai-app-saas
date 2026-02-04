export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

export type Insight = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
};