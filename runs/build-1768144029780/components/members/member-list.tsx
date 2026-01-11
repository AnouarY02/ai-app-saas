import { getMembersByClub } from "../../lib/data/member-store";

export async function MemberList({ clubId }: { clubId: string }) {
  const members = await getMembersByClub(clubId);
  if (!members.length) return <div>Geen leden gevonden.</div>;
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2 text-left">Naam</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Rol</th>
        </tr>
      </thead>
      <tbody>
        {members.map(member => (
          <tr key={member.id} className="border-t">
            <td className="p-2">{member.name}</td>
            <td className="p-2">{member.email}</td>
            <td className="p-2">{member.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

