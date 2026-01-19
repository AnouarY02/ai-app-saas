import { useState, useEffect } from "react";
import { AIRequestItem } from "@/components/AIRequestItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type AIRequest = {
  id: string;
  userId: string;
  prompt: string;
  result?: string;
  createdAt: string;
};

export function AIRequestHistory() {
  const [requests, setRequests] = useState<AIRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    setLoading(true);
    fetch("/api/ai-requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.requests || []);
        setLoading(false);
      });
  }, []);

  const filtered = requests
    .filter((r) =>
      r.prompt.toLowerCase().includes(filter.toLowerCase()) ||
      (r.result || "").toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <Input
          placeholder="Zoek op prompt of resultaat..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-1/2"
        />
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="desc">Nieuwste eerst</option>
          <option value="asc">Oudste eerst</option>
        </Select>
      </div>
      {loading ? (
        <div>Bezig met laden...</div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground">Geen AI-aanvragen gevonden.</div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((req) => (
            <li key={req.id}>
              <AIRequestItem request={req} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
