import CourtList from '../../../../components/courts/court-list';
import CourtForm from '../../../../components/courts/court-form';

export default function CourtsPage({ params }: { params: { clubId: string } }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Banen</h2>
      <CourtForm clubId={params.clubId} />
      <div className="mt-8">
        <CourtList clubId={params.clubId} />
      </div>
    </div>
  );
}

