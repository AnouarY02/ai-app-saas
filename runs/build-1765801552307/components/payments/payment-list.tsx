import { useEffect, useState } from 'react';
import { useUserSession } from '../../lib/session-context';

export type Payment = {
  id: string;
  reservationId: string;
  amount: number;
  status: string;
  createdAt: string;
};

export function PaymentList() {
  const { user } = useUserSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  useEffect(() => {
    if (!user) return;
    fetch(`/api/payments?userId=${user.id}`)
      .then(res => res.json())
      .then(setPayments);
  }, [user]);
  return (
    <ul className="divide-y divide-gray-200 bg-white rounded shadow">
      {payments.map(p => (
        <li key={p.id} className="p-4">
          <div>Reservering: {p.reservationId}</div>
          <div className="text-sm text-gray-600">Bedrag: €{p.amount.toFixed(2)}</div>
          <div className="text-xs text-gray-500">Status: {p.status} | {new Date(p.createdAt).toLocaleString()}</div>
        </li>
      ))}
      {payments.length === 0 && <li className="p-4 text-gray-500">Geen betalingen gevonden.</li>}
    </ul>
  );
}

