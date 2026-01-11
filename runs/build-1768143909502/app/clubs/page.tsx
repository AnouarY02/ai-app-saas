import ClubList from '../../components/clubs/club-list';

export default function ClubsPage() {
  return (
    <main className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Clubs</h2>
      <ClubList />
    </main>
  );
}

