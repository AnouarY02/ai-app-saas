'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../lib/client/auth-actions';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await login(email, password);
    if (res.success) {
      router.replace('/');
    } else {
      setError(res.error || 'Login mislukt');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold mb-4">Inloggen</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input
          type="email"
          placeholder="E-mailadres"
          className="input w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          className="input w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">Login</button>
        <div className="text-center text-sm mt-2">
          Nog geen account? <a href="/register" className="text-primary underline">Registreer</a>
        </div>
      </form>
    </div>
  );
}

