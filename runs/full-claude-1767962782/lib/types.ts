export type User = {
  id: string;
  name: string;
  email: string;
};

export type Team = {
  id: string;
  name: string;
  memberIds: string[];
};

export type Project = {
  id: string;
  name: string;
  teamId?: string;
  description?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  completed: boolean;
};

