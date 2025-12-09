import { getCurrentUser } from '../../lib/auth';
import { UserProfile } from '../../components/users/user-profile';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return redirect('/login');
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mijn profiel</h1>
      <UserProfile user={user} />
    </div>
  );
}

