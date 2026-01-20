import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/lib/tasks/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TaskDetailProps {
  task: {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
  };
}

export function TaskDetail({ task }: TaskDetailProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Verwijderen mislukt");
      router.push("/dashboard");
    } catch (e) {
      setError("Kon taak niet verwijderen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-gray-700 whitespace-pre-line">
          {task.description || <span className="italic text-gray-400">Geen beschrijving</span>}
        </div>
        <div className="text-xs text-gray-400 mb-6">Aangemaakt op {new Date(task.createdAt).toLocaleString()}</div>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Verwijderen..." : "Taak verwijderen"}
        </Button>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      </CardContent>
    </Card>
  );
}
