import { Suspense } from "react";
import CourtList from "../../components/CourtList";

export default function CourtsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courts</h1>
      <Suspense fallback={<div>Loading courts...</div>}>
        <CourtList />
      </Suspense>
    </main>
  );
}
