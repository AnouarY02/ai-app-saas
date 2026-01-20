type AITask = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
};

let tasks: AITask[] = [];

export async function getTaskById(id: string): Promise<AITask | null> {
  return tasks.find((t) => t.id === id) || null;
}

export async function updateTask(id: string, data: Partial<Pick<AITask, "title" | "description">>): Promise<AITask | null> {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...data };
  return tasks[idx];
}

export async function deleteTask(id: string): Promise<boolean> {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

// Voor testdoeleinden: voeg een taak toe
export async function addTask(task: AITask) {
  tasks.push(task);
}

export async function getAllTasksForUser(userId: string): Promise<AITask[]> {
  return tasks.filter((t) => t.userId === userId);
}
