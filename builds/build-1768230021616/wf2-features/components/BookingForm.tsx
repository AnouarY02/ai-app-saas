import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Court {
  id: string;
  name: string;
}

export default function BookingForm() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [courtId, setCourtId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/courts")
      .then((res) => res.json())
      .then((data) => setCourts(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courtId, startTime, endTime }),
      });
      if (!res.ok) throw new Error("Failed to create booking");
      setSuccess(true);
      setCourtId("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
      <Select value={courtId} onValueChange={setCourtId}>
        <SelectTrigger>
          <SelectValue placeholder="Select court" />
        </SelectTrigger>
        <SelectContent>
          {courts.map((court) => (
            <SelectItem key={court.id} value={court.id}>{court.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
        placeholder="Start time"
      />
      <Input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
        placeholder="End time"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Court"}
      </Button>
      {success && <div className="text-green-600">Booking created!</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
