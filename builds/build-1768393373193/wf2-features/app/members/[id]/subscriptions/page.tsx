import { Suspense } from "react";
import { SubscriptionManager } from "@/components/members/SubscriptionManager";

export default function MemberSubscriptionsPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subscription Management</h1>
      <Suspense fallback={<div>Loading subscriptions...</div>}>
        <SubscriptionManager memberId={params.id} />
      </Suspense>
    </main>
  );
}
