"use client";
import { useAuth } from '../../lib/auth-context';
import { useEffect, useState } from 'react';

export default function CreditBalance() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(user?.credits ?? 0);

  useEffect(() => {
    setCredits(user?.credits ?? 0);
  }, [user]);

  return (
    <div className="bg-green-100 text-green-800 px-4 py-2 rounded inline-block">
      <span className="font-semibold">Credits:</span> {credits}
    </div>
  );
}

