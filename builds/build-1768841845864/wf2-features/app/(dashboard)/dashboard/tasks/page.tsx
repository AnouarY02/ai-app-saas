import { Suspense } from "react";
import { TaskList } from "@/components/tasks/task-list";
import { TaskCreateForm } from "@/components/tasks/task-create-form";

export default function TasksPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">AI-taken beheren</h1>
      <div className="mb-8">
        <TaskCreateForm />
      </div>
      <Suspense fallback={<div>Laden...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
}
