import { Suspense } from "react";
import UserList from "../../components/UserList";

export default function UsersPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Suspense fallback={<div>Loading users...</div>}>
        <UserList />
      </Suspense>
    </main>
  );
}
