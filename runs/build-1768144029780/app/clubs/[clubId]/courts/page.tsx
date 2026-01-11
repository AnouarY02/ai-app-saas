import { CourtList } from "../../../../components/courts/court-list";

export default function ClubCourtsPage({ params }: { params: { clubId: string } }) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Banen</h1>
      <CourtList clubId={params.clubId} />
    </div>
  );
}

