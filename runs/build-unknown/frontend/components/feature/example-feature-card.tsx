import { Button } from "components/ui/button";
import { useState } from "react";

type ExampleFeatureCardProps = {};

export function ExampleFeatureCard({}: ExampleFeatureCardProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center gap-4 border">
      <span className="text-lg font-medium">Voorbeeld component</span>
      <span className="text-2xl font-bold text-blue-600">{count}</span>
      <Button onClick={() => setCount((c) => c + 1)} variant="default">
        Tel op
      </Button>
    </div>
  );
}
