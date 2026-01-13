import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  courtId: string;
  userId: string;
  startTime: string;
  endTime: string;
};

type Court = {
  id: string;
  name: string;
};

type User = {
  id: string;
  name: string;
};

type BookingFormProps = {
  onSubmit: (data: Omit<Booking, "id">) => void;
  onCancel: () => void;
  initial?: Omit<Booking, "id">;
  courts: Court[];
  users: User[];
};

function BookingForm({ onSubmit, onCancel, initial, courts, users }: BookingFormProps) {
  const [courtId, setCourtId] = useState(initial?.courtId || (courts[0]?.id || ""));
  const [userId, setUserId] = useState(initial?.userId || (users[0]?.id || ""));
  const [startTime, setStartTime] = useState(initial?.startTime || "");
  const [endTime, setEndTime] = useState(initial?.endTime || "");
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ courtId, userId, startTime, endTime });
      }}
    >
      <select
        className="border rounded px-2 py-1"
        value={courtId}
        onChange={e => setCourtId(e.target.value)}
      >
        {courts.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <select
        className="border rounded px-2 py-1"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      >
        {users.map(u => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
      <input
        className="border rounded px-2 py-1"
        type="datetime-local"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        required
      />
      <input
        className="border rounded px-2 py-1"
        type="datetime-local"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        required
      />
      <div className="flex gap-2 mt-1">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export function BookingManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/bookings").then(res => res.json()),
      fetch("/api/courts").then(res => res.json()),
      fetch("/api/users").then(res => res.json()),
    ]).then(([bookings, courts, users]) => {
      setBookings(bookings);
      setCourts(courts);
      setUsers(users);
      setLoading(false);
    });
  }, []);

  const handleAdd = (data: Omit<Booking, "id">) => {
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(newBooking => {
        setBookings(prev => [...prev, newBooking]);
        setAdding(false);
      });
  };

  const handleEdit = (id: string, data: Omit<Booking, "id">) => {
    fetch(`/api/bookings/${id}", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(updated => {
        setBookings(prev => prev.map(b => (b.id === id ? updated : b)));
        setEditingId(null);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/bookings/${id}", { method: "DELETE" })
      .then(() => setBookings(prev => prev.filter(b => b.id !== id)));
  };

  if (loading) return <div className="animate-pulse">Loading bookings...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Bookings</h3>
        {!adding && (
          <Button size="sm" onClick={() => setAdding(true)}>Add Booking</Button>
        )}
      </div>
      {adding && (
        <BookingForm
          onSubmit={handleAdd}
          onCancel={() => setAdding(false)}
          courts={courts}
          users={users}
        />
      )}
      <ul className="divide-y">
        {bookings.length === 0 && <li className="py-2 text-gray-500">No bookings yet.</li>}
        {bookings.map(booking => (
          <li key={booking.id} className="flex items-center justify-between py-2">
            {editingId === booking.id ? (
              <BookingForm
                initial={booking}
                onSubmit={data => handleEdit(booking.id, data)}
                onCancel={() => setEditingId(null)}
                courts={courts}
                users={users}
              />
            ) : (
              <>
                <span>
                  Court: {courts.find(c => c.id === booking.courtId)?.name || booking.courtId},
                  User: {users.find(u => u.id === booking.userId)?.name || booking.userId},
                  {" "}
                  {new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingId(booking.id)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(booking.id)}>Delete</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
