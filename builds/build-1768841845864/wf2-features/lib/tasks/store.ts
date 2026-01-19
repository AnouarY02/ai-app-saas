type AITask = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
};

class TasksStore {
  private tasks: AITask[] = [];

  getTasksByUser(userId: string): AITask[] {
    return this.tasks.filter((t) => t.userId === userId);
  }

  addTask(task: AITask) {
    this.tasks.push(task);
  }

  // Voor uitbreiding: getTaskById, updateTask, deleteTask
}

export const tasksStore = new TasksStore();
