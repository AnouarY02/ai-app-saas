import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Er is een fout opgetreden');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Netwerkfout');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label className="block mb-1">Naam</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
      )}
      <div>
        <label className="block mb-1">E-mail</label>
        <input
          type="email"
          className="input input-bordered w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Wachtwoord</label>
        <input
          type="password"
          className="input input-bordered w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Even geduld...' : mode === 'login' ? 'Inloggen' : 'Registreren'}
      </button>
    </form>
  );
}

