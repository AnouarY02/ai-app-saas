import { notFound, redirect } from "next/navigation";
import { getTaskById, updateTask } from "@/lib/tasks/utils";
import { TaskForm } from "@/components/tasks/task-form";
import { Suspense } from "react";

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const task = await getTaskById(params.id);
  if (!task) return notFound();

  async function handleSubmit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    await updateTask(task.id, { title, description });
    redirect(`/dashboard/tasks/${task.id}`);
  }

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <Suspense fallback={<div>Formulier laden...</div>}>
        <TaskForm initialTask={task} onSubmit={handleSubmit} />
      </Suspense>
    </main>
  );
}
