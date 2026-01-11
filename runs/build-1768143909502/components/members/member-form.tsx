import { useState } from 'react';
import store from '../../lib/store';

export default function MemberForm({ clubId }: { clubId: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      setError('Naam en email zijn verplicht.');
      return;
    }
    store.addMember({ clubId, name, email, walletBalance });
    setName('');
    setEmail('');
    setWalletBalance(0);
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 flex flex-col gap-4 max-w-md">
      <div className="font-semibold">Nieuw lid toevoegen</div>
      <input
        type="text"
        placeholder="Naam"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        placeholder="Wallet saldo"
        value={walletBalance}
        onChange={e => setWalletBalance(Number(e.target.value))}
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Toevoegen</button>
    </form>
  );
}

