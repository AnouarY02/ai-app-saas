import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserFormProps = {
  onSubmit: (user: Omit<User, "id">) => void;
  onCancel: () => void;
  initial?: Omit<User, "id">;
};

function UserForm({ onSubmit, onCancel, initial }: UserFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [role, setRole] = useState(initial?.role || "member");
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ name, email, role });
      }}
    >
      <input
        className="border rounded px-2 py-1"
        placeholder="Full name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="border rounded px-2 py-1"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <select
        className="border rounded px-2 py-1"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
        <option value="member">Member</option>
      </select>
      <div className="flex gap-2 mt-1">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleAdd = (user: Omit<User, "id">) => {
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(newUser => {
        setUsers(prev => [...prev, newUser]);
        setAdding(false);
      });
  };

  const handleEdit = (id: string, user: Omit<User, "id">) => {
    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(updated => {
        setUsers(prev => prev.map(u => (u.id === id ? updated : u)));
        setEditingId(null);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(prev => prev.filter(u => u.id !== id)));
  };

  if (loading) return <div className="animate-pulse">Loading users...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Users</h3>
        {!adding && (
          <Button size="sm" onClick={() => setAdding(true)}>Add User</Button>
        )}
      </div>
      {adding && (
        <UserForm onSubmit={handleAdd} onCancel={() => setAdding(false)} />
      )}
      <ul className="divide-y">
        {users.length === 0 && <li className="py-2 text-gray-500">No users yet.</li>}
        {users.map(user => (
          <li key={user.id} className="flex items-center justify-between py-2">
            {editingId === user.id ? (
              <UserForm
                initial={user}
                onSubmit={u => handleEdit(user.id, u)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <span>{user.name} <span className="text-xs text-gray-500">({user.role})</span></span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingId(user.id)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>Delete</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
