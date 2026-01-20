import { HabitForm } from "@/components/habits/HabitForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewHabitPage() {
  return (
    <main className="max-w-md mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Habit</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/habits">Cancel</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <HabitForm />
        </CardContent>
      </Card>
    </main>
  );
}
