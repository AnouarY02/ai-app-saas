import { HabitForm } from "@/components/habits/HabitForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface HabitPageProps {
  params: { id: string };
}

export default async function HabitEditPage({ params }: HabitPageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/habits/${params.id}`);
  if (!res.ok) notFound();
  const habit = await res.json();

  return (
    <main className="max-w-md mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Edit Habit</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/habits">Back</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <HabitForm habit={habit} />
        </CardContent>
      </Card>
    </main>
  );
}
