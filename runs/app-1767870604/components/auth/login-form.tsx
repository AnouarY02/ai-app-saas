import { useState } from 'react';
import { login } from '../../lib/auth/actions';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
    if (res.success) {
      router.push('/dashboard');
    } else {
      setError(res.error || 'Inloggen mislukt');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1">E-mail</label>
        <input id="email" name="email" type="email" required className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">Wachtwoord</label>
        <input id="password" name="password" type="password" required className="w-full border rounded px-3 py-2" />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90">Inloggen</button>
    </form>
  );
}

