import { Suspense } from "react";
import { ClubOverview } from "@/components/management/club-overview";
import { CourtManager } from "@/components/management/court-manager";
import { UserManager } from "@/components/management/user-manager";
import { BookingManager } from "@/components/management/booking-manager";

export default function ManagementPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Club Management</h1>
      <Suspense fallback={<div>Loading club overview...</div>}>
        <ClubOverview />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<div>Loading courts...</div>}>
          <CourtManager />
        </Suspense>
        <Suspense fallback={<div>Loading users...</div>}>
          <UserManager />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<div>Loading bookings...</div>}>
          <BookingManager />
        </Suspense>
      </div>
    </div>
  );
}
