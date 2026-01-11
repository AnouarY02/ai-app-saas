import store from '../../../../lib/store';

export default function ClubDashboardPage({ params }: { params: { clubId: string } }) {
  const club = store.getClub(params.clubId);
  if (!club) {
    return <div>Club niet gevonden.</div>;
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard: {club.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Leden</div>
          <div className="text-2xl font-bold">{store.getMembers(club.id).length}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Banen</div>
          <div className="text-2xl font-bold">{store.getCourts(club.id).length}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Reserveringen</div>
          <div className="text-2xl font-bold">{store.getBookings(club.id).length}</div>
        </div>
      </div>
    </div>
  );
}

