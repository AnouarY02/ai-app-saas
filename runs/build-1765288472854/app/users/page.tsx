import { getCurrentUser } from '../../lib/auth';
import { UserList } from '../../components/users/user-list';
import { redirect } from 'next/navigation';

export default async function UsersPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return redirect('/');
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gebruikersbeheer</h1>
      <UserList />
    </div>
  );
}

