import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type TaskListProps = {
  tasks: {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
  }[];
};

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) {
    return <div className="text-gray-500">Geen AI-taken gevonden.</div>;
  }
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{task.title}</CardTitle>
            <Link href={`/dashboard/tasks/${task.id}`}>
              <Button size="sm" variant="outline">Details</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2 line-clamp-2">{task.description || "Geen beschrijving."}</p>
            <div className="text-xs text-gray-400">Aangemaakt op: {new Date(task.createdAt).toLocaleString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
