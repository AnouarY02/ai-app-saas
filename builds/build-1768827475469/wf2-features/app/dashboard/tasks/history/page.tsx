import { Suspense } from "react";
import { TaskHistoryList } from "@/components/tasks/task-history-list";

export default function TaskHistoryPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">AI-taakgeschiedenis</h1>
      <Suspense fallback={<div>Laden...</div>}>
        <TaskHistoryList />
      </Suspense>
    </div>
  );
}
