import CreditBalance from '../../../components/credits/credit-balance';
import CreditPurchaseForm from '../../../components/credits/credit-purchase-form';

export default function CreditsPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Mijn Credits</h2>
      <CreditBalance />
      <div>
        <h3 className="text-xl font-semibold mb-2">Koop Credits</h3>
        <CreditPurchaseForm />
      </div>
    </div>
  );
}

