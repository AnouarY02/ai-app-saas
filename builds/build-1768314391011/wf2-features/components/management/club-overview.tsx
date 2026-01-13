import { useEffect, useState } from "react";

type Tenant = {
  id: string;
  name: string;
  address?: string;
};

export function ClubOverview() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tenants/me")
      .then((res) => res.json())
      .then((data) => {
        setTenant(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="animate-pulse">Loading club info...</div>;
  if (!tenant) return <div className="text-red-500">Club info not found.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">Club Info</h2>
      <div className="text-gray-700">
        <div><span className="font-medium">Name:</span> {tenant.name}</div>
        {tenant.address && <div><span className="font-medium">Address:</span> {tenant.address}</div>}
        <div><span className="font-medium">ID:</span> {tenant.id}</div>
      </div>
    </div>
  );
}
