import { useState } from "react";
import { useAuth } from "../../lib/auth-context";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const ok = await login(email, password);
    if (!ok) setError("Ongeldige inloggegevens");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Wachtwoord</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Inloggen</button>
    </form>
  );
}

