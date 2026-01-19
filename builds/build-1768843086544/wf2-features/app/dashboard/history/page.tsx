import { Suspense } from "react";
import { AIRequestHistory } from "@/components/ai-request-history";

export default function HistoryPage() {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">AI-aanvraaggeschiedenis</h1>
      <Suspense fallback={<div>Bezig met laden...</div>}>
        <AIRequestHistory />
      </Suspense>
    </main>
  );
}
