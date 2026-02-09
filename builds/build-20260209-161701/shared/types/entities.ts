export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
