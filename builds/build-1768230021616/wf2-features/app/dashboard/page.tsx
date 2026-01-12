import { Suspense } from "react";
import { ClubOverview } from "../../components/ClubOverview";

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-8 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Suspense fallback={<div>Loading club overview...</div>}>
        <ClubOverview />
      </Suspense>
    </main>
  );
}
