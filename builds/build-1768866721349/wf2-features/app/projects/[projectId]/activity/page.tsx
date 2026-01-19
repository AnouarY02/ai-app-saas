import { Suspense } from "react";
import { ActivityFeed } from "components/activity/ActivityFeed";

export default function ProjectActivityPage({ params }: { params: { projectId: string } }) {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project Activity</h1>
      <Suspense fallback={<div className="text-muted-foreground">Loading activity...</div>}>
        <ActivityFeed projectId={params.projectId} />
      </Suspense>
    </main>
  );
}
