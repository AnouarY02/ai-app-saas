import { notFound } from "next/navigation";
import { TaskDetail } from "@/components/tasks/task-detail";
import { getTaskById } from "@/lib/tasks/utils";
import { Suspense } from "react";

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const task = await getTaskById(params.id);
  if (!task) return notFound();
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <Suspense fallback={<div>Taak laden...</div>}>
        <TaskDetail task={task} />
      </Suspense>
    </main>
  );
}
