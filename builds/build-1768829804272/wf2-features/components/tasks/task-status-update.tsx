import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AITask } from "lib/tasks/types";

interface TaskStatusUpdateProps {
  task: AITask;
  onStatusUpdated?: (status: string) => void;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "running", label: "Running" },
  { value: "completed", label: "Completed" },
];

export function TaskStatusUpdate({ task, onStatusUpdated }: TaskStatusUpdateProps) {
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tasks/${task.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error("Status update failed");
      }
      onStatusUpdated?.(status);
    } catch (e) {
      setError("Kon status niet bijwerken.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <Select value={status} onValueChange={setStatus} disabled={loading}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" onClick={handleUpdate} disabled={loading || status === task.status}>
        {loading ? "Bijwerken..." : "Status bijwerken"}
      </Button>
      {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
    </div>
  );
}
