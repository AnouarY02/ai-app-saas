import { Button } from "components/ui/button";
import { useState } from "react";

type ExampleCardProps = {
  initialCount?: number;
};

export function ExampleCard({ initialCount = 0 }: ExampleCardProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="w-full max-w-md rounded-lg border bg-white shadow p-6 flex flex-col items-center">
      <span className="text-lg font-medium mb-2">Voorbeeld component</span>
      <p className="mb-4 text-gray-600">Klik op de knop om de teller te verhogen.</p>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold">{count}</span>
        <Button onClick={() => setCount((c) => c + 1)} variant="default">
          Verhoog
        </Button>
      </div>
    </div>
  );
}
