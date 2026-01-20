import { Suspense } from "react";
import { HabitList } from "@/components/habits/HabitList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HabitsPage() {
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <Button asChild>
          <Link href="/habits/new">Add Habit</Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading habits...</div>}>
        <HabitList />
      </Suspense>
    </main>
  );
}
