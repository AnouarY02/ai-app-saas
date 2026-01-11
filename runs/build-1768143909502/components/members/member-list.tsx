import store from '../../lib/store';
import WalletBalance from './wallet-balance';

export default function MemberList({ clubId }: { clubId: string }) {
  const members = store.getMembers(clubId);
  return (
    <div className="space-y-2">
      {members.length === 0 && <div className="text-gray-500">Geen leden gevonden.</div>}
      {members.map(member => (
        <div key={member.id} className="bg-white rounded shadow p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">{member.name}</div>
            <div className="text-gray-500 text-sm">{member.email}</div>
          </div>
          <WalletBalance balance={member.walletBalance} />
        </div>
      ))}
    </div>
  );
}

