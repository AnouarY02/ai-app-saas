export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
}

export interface Insight {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}
