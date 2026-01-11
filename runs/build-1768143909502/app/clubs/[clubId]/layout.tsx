import ClubSidebar from '../../../components/clubs/club-sidebar';
import type { ReactNode } from 'react';

export default function ClubLayout({ children, params }: { children: ReactNode; params: { clubId: string } }) {
  return (
    <div className="flex min-h-screen">
      <ClubSidebar clubId={params.clubId} />
      <div className="flex-1 p-8 bg-gray-50">{children}</div>
    </div>
  );
}

