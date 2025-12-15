import { Button } from "@/components/ui/button";
import { useState } from "react";

type DemoFeatureCardProps = {};

export function DemoFeatureCard({}: DemoFeatureCardProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center gap-4">
      <div className="text-lg font-medium">Demo Feature Component</div>
      <div className="text-4xl font-bold" data-testid="demo-count">{count}</div>
      <Button onClick={() => setCount((c) => c + 1)} data-testid="demo-increment">
        Increment
      </Button>
    </div>
  );
}
