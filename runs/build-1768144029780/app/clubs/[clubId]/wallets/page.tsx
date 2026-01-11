import { WalletList } from "../../../../components/wallets/wallet-list";

export default function ClubWalletsPage({ params }: { params: { clubId: string } }) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Wallets</h1>
      <WalletList clubId={params.clubId} />
    </div>
  );
}

