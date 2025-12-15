import { useEffect, useState } from 'react';

interface Court {
  id: string;
  name: string;
  location: string;
  active: boolean;
}

export function CourtList() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courts')
      .then(res => res.json())
      .then(setCourts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laden...</div>;

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2 text-left">Naam</th>
          <th className="p-2 text-left">Locatie</th>
          <th className="p-2 text-left">Beschikbaar</th>
        </tr>
      </thead>
      <tbody>
        {courts.map(court => (
          <tr key={court.id} className="border-t">
            <td className="p-2">{court.name}</td>
            <td className="p-2">{court.location}</td>
            <td className="p-2">{court.active ? 'Ja' : 'Nee'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

