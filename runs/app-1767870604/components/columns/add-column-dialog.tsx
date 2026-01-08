import { useState } from 'react';

export default function AddColumnDialog({ boardId, onAdd }: { boardId: string; onAdd: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch(`/api/boards/${boardId}/columns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      setOpen(false);
      setTitle('');
      onAdd();
    } else {
      const data = await res.json();
      setError(data.error || 'Fout bij aanmaken kolom');
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 text-sm">
        + Kolom
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 w-72">
            <h3 className="text-lg font-bold mb-4">Nieuwe Kolom</h3>
            <input
              type="text"
              placeholder="Titel"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mb-3"
            />
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setOpen(false)} className="px-3 py-1 rounded border">Annuleren</button>
              <button type="submit" className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90">Aanmaken</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

