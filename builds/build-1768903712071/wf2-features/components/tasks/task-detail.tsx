import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type TaskDetailProps = {
  task: {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
  };
};

export function TaskDetail({ task }: TaskDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700">{task.description || "Geen beschrijving."}</p>
        <div className="text-xs text-gray-400 mb-4">Aangemaakt op: {new Date(task.createdAt).toLocaleString()}</div>
        <div className="flex gap-2">
          <Link href={`/dashboard/tasks/${task.id}/edit`}>
            <Button variant="outline">Bewerken</Button>
          </Link>
          <Link href="/dashboard/tasks">
            <Button variant="secondary">Terug</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
