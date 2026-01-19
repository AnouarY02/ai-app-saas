import { AITask } from "@/lib/tasks/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaskHistoryItem({ task }: { task: AITask }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status: <span className="font-medium text-green-600">{task.status}</span></span>
          <span className="text-xs text-muted-foreground">Aangemaakt: {new Date(task.createdAt).toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
