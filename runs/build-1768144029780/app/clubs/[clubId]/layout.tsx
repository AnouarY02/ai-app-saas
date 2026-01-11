import { ReactNode } from "react";
import { ClubSidebar } from "../../../components/clubs/club-sidebar";

export default function ClubLayout({ children, params }: { children: ReactNode; params: { clubId: string } }) {
  return (
    <div className="flex gap-8">
      <ClubSidebar clubId={params.clubId} />
      <div className="flex-1">{children}</div>
    </div>
  );
}

