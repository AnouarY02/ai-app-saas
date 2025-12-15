import { useEffect, useState } from 'react';
import { User } from '../../lib/types';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laden...</div>;
  if (!user) return <div>Niet ingelogd.</div>;

  return (
    <div className="space-y-4">
      <div>
        <span className="font-medium">Naam:</span> {user.name}
      </div>
      <div>
        <span className="font-medium">E-mail:</span> {user.email}
      </div>
      <div>
        <span className="font-medium">Rol:</span> {user.role}
      </div>
      <div>
        <span className="font-medium">Aangemaakt op:</span> {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

