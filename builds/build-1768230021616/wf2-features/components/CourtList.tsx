import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Court {
  id: string;
  clubId: string;
  name: string;
}

export default function CourtList() {
  const [courts, setCourts] = useState<Court[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courts")
      .then((res) => res.json())
      .then((data) => {
        setCourts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading courts...</div>;
  if (!courts || courts.length === 0) return <div>No courts found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courts.map((court) => (
        <Card key={court.id}>
          <CardHeader>
            <CardTitle>{court.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Court ID: {court.id}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
