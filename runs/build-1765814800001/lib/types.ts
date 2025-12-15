export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
};

export type Feature = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  createdAt: string;
};

export type DemoPage = {
  id: string;
  title: string;
  featureId: string;
  content: string;
  createdAt: string;
};

