import { getCurrentUser } from '../../lib/data';
import { UserAvatar } from '../../components/user-avatar';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <UserAvatar user={user} size={64} />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      {/* Settings form could go here */}
    </div>
  );
}

