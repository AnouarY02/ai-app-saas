import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  clubId: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (!users || users.length === 0) return <div>No users found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">Email: {user.email}</div>
            <div className="text-sm">Role: <span className="capitalize">{user.role}</span></div>
            <div className="text-xs mt-2">Club ID: {user.clubId}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
