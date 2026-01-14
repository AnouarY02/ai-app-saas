import { getCourts } from "@/lib/courts/data";
import { getBookings } from "@/lib/bookings/data";
import { getMemberById } from "@/lib/members/data";

export async function getCalendarBookings() {
  const courts = await getCourts();
  const bookings = await getBookings();
  // Toon komende 7 dagen
  const days: string[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toDateString();
  });
  // Voeg memberName toe aan bookings
  const bookingsWithMember = await Promise.all(
    bookings.map(async (b) => {
      const member = await getMemberById(b.memberId);
      return {
        ...b,
        memberName: member ? member.name : "Unknown"
      };
    })
  );
  return { days, courts, bookings: bookingsWithMember };
}
