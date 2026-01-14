import { PaymentForm } from "@/components/payments/PaymentForm";

export default function NewPaymentPage() {
  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Payment</h1>
      <PaymentForm />
    </main>
  );
}
