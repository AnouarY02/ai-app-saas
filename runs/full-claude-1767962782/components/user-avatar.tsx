import { getCurrentUser } from '../lib/data/users';

export default async function UserAvatar() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
        {user.name.charAt(0)}
      </div>
      <span className="text-sm font-medium">{user.name}</span>
    </div>
  );
}

