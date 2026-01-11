import MemberList from '../../../../components/members/member-list';
import MemberForm from '../../../../components/members/member-form';

export default function MembersPage({ params }: { params: { clubId: string } }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Leden</h2>
      <MemberForm clubId={params.clubId} />
      <div className="mt-8">
        <MemberList clubId={params.clubId} />
      </div>
    </div>
  );
}

