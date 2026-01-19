import { useEffect, useState } from "react";
import { TaskHistoryItem } from "./task-history-item";
import { AITask } from "@/lib/tasks/types";

export function TaskHistoryList() {
  const [tasks, setTasks] = useState<AITask[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks/history")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Laden...</div>;
  if (!tasks || tasks.length === 0)
    return <div className="text-muted-foreground">Geen voltooide taken gevonden.</div>;

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskHistoryItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
