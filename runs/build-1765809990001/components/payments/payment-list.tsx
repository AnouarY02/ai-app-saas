import { useEffect, useState } from 'react';

interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export function PaymentList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(setPayments)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laden...</div>;

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2 text-left">Reservering</th>
          <th className="p-2 text-left">Bedrag (€)</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Datum</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id} className="border-t">
            <td className="p-2">{payment.reservationId}</td>
            <td className="p-2">{payment.amount.toFixed(2)}</td>
            <td className="p-2">{payment.status}</td>
            <td className="p-2">{new Date(payment.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

