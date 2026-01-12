import { Suspense } from "react";
import ClubList from "../../components/ClubList";

export default function ClubsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clubs</h1>
      <Suspense fallback={<div>Loading clubs...</div>}>
        <ClubList />
      </Suspense>
    </main>
  );
}
