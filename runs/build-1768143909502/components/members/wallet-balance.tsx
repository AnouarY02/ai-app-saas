export default function WalletBalance({ balance }: { balance: number }) {
  return (
    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
      € {balance.toFixed(2)}
    </span>
  );
}

