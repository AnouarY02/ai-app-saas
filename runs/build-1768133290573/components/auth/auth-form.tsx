import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login' ? { email, password } : { name, email, password };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.replace('/dashboard');
    } else {
      const data = await res.json();
      setError(data.error || 'Er is iets misgegaan');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label className="block mb-1 font-medium">Naam</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
            autoFocus
          />
        </div>
      )}
      <div>
        <label className="block mb-1 font-medium">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          autoFocus={mode === 'login'}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Wachtwoord</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 font-semibold"
      >
        {mode === 'login' ? 'Inloggen' : 'Registreren'}
      </button>
    </form>
  );
}

