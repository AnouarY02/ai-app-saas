import { MemberList } from "../../../../components/members/member-list";

export default function ClubMembersPage({ params }: { params: { clubId: string } }) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Leden</h1>
      <MemberList clubId={params.clubId} />
    </div>
  );
}

