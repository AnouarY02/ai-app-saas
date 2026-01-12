import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Club {
  id: string;
  name: string;
  address: string;
  createdAt: string;
}

export default function ClubList() {
  const [clubs, setClubs] = useState<Club[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clubs")
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading clubs...</div>;
  if (!clubs || clubs.length === 0) return <div>No clubs found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clubs.map((club) => (
        <Card key={club.id}>
          <CardHeader>
            <CardTitle>{club.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">{club.address}</div>
            <div className="text-xs mt-2">Created: {new Date(club.createdAt).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
