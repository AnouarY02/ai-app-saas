import { useState } from "react";
import { Habit } from "@/lib/habits/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface HabitFormProps {
  habit?: Habit;
}

export function HabitForm({ habit }: HabitFormProps) {
  const [name, setName] = useState(habit?.name || "");
  const [description, setDescription] = useState(habit?.description || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const method = habit ? "PATCH" : "POST";
    const url = habit ? `/api/habits/${habit.id}` : "/api/habits";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });
    setLoading(false);
    router.push("/habits");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
      </div>
      <Button type="submit" disabled={loading}>
        {habit ? "Update Habit" : "Create Habit"}
      </Button>
    </form>
  );
}
