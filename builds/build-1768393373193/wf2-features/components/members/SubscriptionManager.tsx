import React from "react";
import { getMemberSubscription, updateMemberSubscription } from "@/lib/members/subscription-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export async function SubscriptionManager({ memberId }: { memberId: string }) {
  const subscription = await getMemberSubscription(memberId);

  async function handleToggle() {
    "use server";
    await updateMemberSubscription(memberId, subscription.status === "active" ? "inactive" : "active");
  }

  return (
    <div className="space-y-4">
      <div>
        <span className="font-semibold">Status:</span>{" "}
        <Badge variant={subscription.status === "active" ? "success" : "destructive"}>
          {subscription.status}
        </Badge>
      </div>
      <form action={handleToggle}>
        <Button type="submit" variant={subscription.status === "active" ? "destructive" : "default"}>
          {subscription.status === "active" ? "Deactivate" : "Activate"} Subscription
        </Button>
      </form>
      <div className="text-xs text-muted-foreground">Joined: {new Date(subscription.joinedAt).toLocaleDateString()}</div>
    </div>
  );
}
