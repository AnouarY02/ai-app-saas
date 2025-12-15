import { CourtList } from '../../../components/courts/court-list';
import { CourtForm } from '../../../components/courts/court-form';

export default function CourtsPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Padelbanen</h1>
      <CourtForm />
      <div className="mt-8">
        <CourtList />
      </div>
    </section>
  );
}

