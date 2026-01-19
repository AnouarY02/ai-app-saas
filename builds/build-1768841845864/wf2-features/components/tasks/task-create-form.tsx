import { useState } from "react";

export function TaskCreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const res = await fetch("/api/aitasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
      // Optionally, trigger a reload of the task list
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error || "Er is iets misgegaan.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-4 rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Titel *</label>
        <input
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Beschrijving</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading || !title.trim()}
      >
        {loading ? "Toevoegen..." : "AI-taak toevoegen"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Taak toegevoegd!</div>}
    </form>
  );
}
