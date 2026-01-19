import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/aitasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Laden...</div>;
  if (!tasks || tasks.length === 0)
    return <div className="text-muted-foreground">Geen AI-taken gevonden.</div>;

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="bg-card rounded-lg p-4 flex flex-col gap-2 border">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{task.title}</span>
            <StatusBadge status={task.status} />
          </div>
          {task.description && (
            <p className="text-muted-foreground text-sm">{task.description}</p>
          )}
          <span className="text-xs text-gray-400">Aangemaakt op {new Date(task.createdAt).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}
