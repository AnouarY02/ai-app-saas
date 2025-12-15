import { PaymentList } from '../../../components/payments/payment-list';
import { PaymentForm } from '../../../components/payments/payment-form';

export default function PaymentsPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Betalingen</h1>
      <PaymentForm />
      <div className="mt-8">
        <PaymentList />
      </div>
    </section>
  );
}

