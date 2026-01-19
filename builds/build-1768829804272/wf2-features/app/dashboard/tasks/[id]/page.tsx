import { notFound } from "next/navigation";
import { getTaskById } from "lib/tasks/utils";
import { TaskDetail } from "components/tasks/task-detail";
import { Suspense } from "react";

interface TaskDetailPageProps {
  params: { id: string };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const task = await getTaskById(params.id);
  if (!task) {
    notFound();
  }
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <TaskDetail task={task} />
      </Suspense>
    </div>
  );
}
