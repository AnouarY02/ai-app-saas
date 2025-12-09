import { User } from '../../lib/types';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white rounded shadow p-6 max-w-md">
      <div className="mb-2 font-bold">{user.name}</div>
      <div className="mb-2">{user.email}</div>
      <div className="mb-2 text-sm text-muted-foreground">Rol: {user.role}</div>
      <div className="text-xs text-muted-foreground">Aangemaakt op: {new Date(user.createdAt).toLocaleString()}</div>
    </div>
  );
}

