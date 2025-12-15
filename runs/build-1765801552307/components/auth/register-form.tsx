import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Registratie mislukt');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block mb-1">Naam</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block mb-1">E-mailadres</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block mb-1">Wachtwoord</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border rounded px-2 py-1" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Registreren</button>
      {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
    </form>
  );
}

