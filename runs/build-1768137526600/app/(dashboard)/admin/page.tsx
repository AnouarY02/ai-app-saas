import AdminUserList from '../../../components/admin/admin-user-list';
import AdminBookingList from '../../../components/admin/admin-booking-list';
import AdminCourtForm from '../../../components/admin/admin-court-form';
import CourtList from '../../../components/courts/court-list';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Admin Beheer</h2>
      <section>
        <h3 className="text-xl font-semibold mb-2">Gebruikers</h3>
        <AdminUserList />
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">Boekingen</h3>
        <AdminBookingList />
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">Banen</h3>
        <CourtList />
        <AdminCourtForm />
      </section>
    </div>
  );
}

