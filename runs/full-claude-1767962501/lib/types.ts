export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  teamIds?: string[];
};

export type Team = {
  id: string;
  name: string;
  memberIds?: string[];
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  teamId: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  status: 'open' | 'in progress' | 'done';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

