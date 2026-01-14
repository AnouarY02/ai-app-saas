import React from "react";
import { use } from "react";
import { getCalendarBookings } from "@/lib/bookings/calendar-utils";
import { Card } from "@/components/ui/card";

export async function CalendarView() {
  const { days, courts, bookings } = await getCalendarBookings();

  if (!courts.length) {
    return <div className="text-muted-foreground">No courts available.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-muted">Court</th>
            {days.map((day) => (
              <th key={day} className="border px-2 py-1 bg-muted">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court.id}>
              <td className="border px-2 py-1 font-semibold">{court.name}</td>
              {days.map((day) => {
                const dayBookings = bookings.filter(
                  (b) => b.courtId === court.id && new Date(b.startTime).toDateString() === day
                );
                return (
                  <td key={day} className="border px-2 py-1 min-w-[120px]">
                    {dayBookings.length === 0 ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      <div className="flex flex-col gap-1">
                        {dayBookings.map((b) => (
                          <Card key={b.id} className="p-1 bg-primary/10 border-primary/20">
                            <div className="text-xs font-medium">
                              {new Date(b.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              {" - "}
                              {new Date(b.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                            <div className="text-xs text-muted-foreground">{b.memberName}</div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
