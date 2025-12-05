"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PromptForm() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Fout bij aanmaken prompt');
      } else {
        setInput('');
        router.refresh();
      }
    } catch (err) {
      setError('Netwerkfout');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="font-medium">Nieuwe prompt</label>
      <textarea
        className="input input-bordered w-full min-h-[60px]"
        value={input}
        onChange={e => setInput(e.target.value)}
        required
        placeholder="Typ je AI-prompt..."
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary self-end" disabled={loading}>
        {loading ? 'Versturen...' : 'Prompt versturen'}
      </button>
    </form>
  );
}

