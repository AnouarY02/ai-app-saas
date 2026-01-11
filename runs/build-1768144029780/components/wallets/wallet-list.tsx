import { getWalletsByClub } from "../../lib/data/wallet-store";
import { getMembersByClub } from "../../lib/data/member-store";

export async function WalletList({ clubId }: { clubId: string }) {
  const wallets = await getWalletsByClub(clubId);
  const members = await getMembersByClub(clubId);
  if (!wallets.length) return <div>Geen wallets gevonden.</div>;
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2 text-left">Lid</th>
          <th className="p-2 text-left">Saldo</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map(wallet => {
          const member = members.find(m => m.id === wallet.memberId);
          return (
            <tr key={wallet.id} className="border-t">
              <td className="p-2">{member ? member.name : wallet.memberId}</td>
              <td className="p-2">{wallet.balance} credits</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

