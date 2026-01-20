import { useEffect, useState } from "react";
import { Habit, HabitStreak } from "@/lib/habits/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HabitList() {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!habits || habits.length === 0)
    return <div className="text-muted-foreground">No habits yet. Start by adding one!</div>;

  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">{habit.name}</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href={`/habits/${habit.id}`}>Edit</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">{habit.description}</span>
              <span className="text-xs text-green-600">Streak: {habit.streak || 0} days</span>
              <form
                action={`/api/habits/${habit.id}/complete`}
                method="POST"
                className="mt-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await fetch(`/api/habits/${habit.id}/complete`, { method: "POST" });
                  setLoading(true);
                  fetch("/api/habits")
                    .then((res) => res.json())
                    .then((data) => setHabits(data))
                    .finally(() => setLoading(false));
                }}
              >
                <Button type="submit" size="sm" variant="success">
                  Mark as Done Today
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
