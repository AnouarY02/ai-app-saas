import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AITask } from "lib/tasks/types";

interface TaskDetailProps {
  task: AITask;
}

export function TaskDetail({ task }: TaskDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <Badge variant={task.status === "completed" ? "success" : task.status === "running" ? "secondary" : "outline"}>
          {task.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">
          Aangemaakt op: {new Date(task.createdAt).toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">
          Task ID: {task.id}
        </div>
      </CardContent>
    </Card>
  );
}
