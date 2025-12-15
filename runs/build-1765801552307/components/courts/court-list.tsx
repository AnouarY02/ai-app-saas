import { useEffect, useState } from 'react';

export type Court = {
  id: string;
  name: string;
  location: string;
  description?: string;
};

export function CourtList() {
  const [courts, setCourts] = useState<Court[]>([]);
  useEffect(() => {
    fetch('/api/courts')
      .then(res => res.json())
      .then(setCourts);
  }, []);
  return (
    <ul className="divide-y divide-gray-200 bg-white rounded shadow">
      {courts.map(court => (
        <li key={court.id} className="p-4">
          <div className="font-semibold">{court.name}</div>
          <div className="text-sm text-gray-600">{court.location}</div>
          {court.description && <div className="text-xs text-gray-500 mt-1">{court.description}</div>}
        </li>
      ))}
      {courts.length === 0 && <li className="p-4 text-gray-500">Geen banen gevonden.</li>}
    </ul>
  );
}

