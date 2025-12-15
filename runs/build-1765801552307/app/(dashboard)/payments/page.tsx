import { PaymentList } from '../../../components/payments/payment-list';

export default function PaymentsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mijn betalingen</h2>
      <PaymentList />
    </div>
  );
}

