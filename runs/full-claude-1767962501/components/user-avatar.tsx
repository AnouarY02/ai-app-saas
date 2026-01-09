import Image from 'next/image';
import { User } from '../lib/types';

export function UserAvatar({ user, size = 32 }: { user?: User; size?: number }) {
  if (user?.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt={user.name}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
      style={{ width: size, height: size }}
    >
      {user?.name?.[0]?.toUpperCase() || '?'}
    </div>
  );
}

