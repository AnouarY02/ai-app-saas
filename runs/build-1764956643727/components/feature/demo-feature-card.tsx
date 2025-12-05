import { Button } from "@/components/ui/button";
import { useState } from "react";

type DemoFeatureCardProps = {};

export function DemoFeatureCard({}: DemoFeatureCardProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
      <span className="text-lg font-medium mb-2">Demo Feature Component</span>
      <p className="mb-4 text-muted-foreground">Klik op de knop om de teller te verhogen.</p>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold">{count}</span>
        <Button onClick={() => setCount((c) => c + 1)} variant="default">
          Verhoog
        </Button>
      </div>
    </div>
  );
}
