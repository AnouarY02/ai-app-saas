import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      window.location.href = '/';
    } else {
      setError('Ongeldige inloggegevens');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96 space-y-4">
      <h2 className="text-xl font-bold">Inloggen</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input
        type="email"
        placeholder="E-mailadres"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="password"
        placeholder="Wachtwoord"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        Inloggen
      </button>
    </form>
  );
}

