import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Court = {
  id: string;
  name: string;
};

type CourtFormProps = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
  initialName?: string;
};

function CourtForm({ onSubmit, onCancel, initialName }: CourtFormProps) {
  const [name, setName] = useState(initialName || "");
  return (
    <form
      className="flex gap-2"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(name);
      }}
    >
      <input
        className="border rounded px-2 py-1"
        placeholder="Court name or number"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Button type="submit">Save</Button>
      <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
    </form>
  );
}

export function CourtManager() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/courts")
      .then(res => res.json())
      .then(data => {
        setCourts(data);
        setLoading(false);
      });
  }, []);

  const handleAdd = (name: string) => {
    fetch("/api/courts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(newCourt => {
        setCourts(prev => [...prev, newCourt]);
        setAdding(false);
      });
  };

  const handleEdit = (id: string, name: string) => {
    fetch(`/api/courts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(updated => {
        setCourts(prev => prev.map(c => (c.id === id ? updated : c)));
        setEditingId(null);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/courts/${id}`, { method: "DELETE" })
      .then(() => setCourts(prev => prev.filter(c => c.id !== id)));
  };

  if (loading) return <div className="animate-pulse">Loading courts...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Courts</h3>
        {!adding && (
          <Button size="sm" onClick={() => setAdding(true)}>Add Court</Button>
        )}
      </div>
      {adding && (
        <CourtForm onSubmit={handleAdd} onCancel={() => setAdding(false)} />
      )}
      <ul className="divide-y">
        {courts.length === 0 && <li className="py-2 text-gray-500">No courts yet.</li>}
        {courts.map(court => (
          <li key={court.id} className="flex items-center justify-between py-2">
            {editingId === court.id ? (
              <CourtForm
                initialName={court.name}
                onSubmit={name => handleEdit(court.id, name)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <span>{court.name}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingId(court.id)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(court.id)}>Delete</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
