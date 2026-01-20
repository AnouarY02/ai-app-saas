import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) {
    return <div className="text-center text-gray-400 py-12">Geen AI-taken gevonden.</div>;
  }
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="truncate text-gray-600 text-sm">
                {task.description || <span className="italic text-gray-400">Geen beschrijving</span>}
              </div>
              <div className="text-xs text-gray-400 mt-2">Aangemaakt op {new Date(task.createdAt).toLocaleString()}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
