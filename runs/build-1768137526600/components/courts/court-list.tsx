"use client";
import { useEffect, useState } from 'react';

interface Court {
  id: string;
  name: string;
}

export default function CourtList() {
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    fetch('/api/courts')
      .then(res => res.json())
      .then(setCourts);
  }, []);

  return (
    <ul className="divide-y">
      {courts.length === 0 && <li className="py-2 text-gray-500">Geen banen beschikbaar</li>}
      {courts.map(c => (
        <li key={c.id} className="py-2">{c.name}</li>
      ))}
    </ul>
  );
}

