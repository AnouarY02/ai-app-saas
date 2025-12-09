import { getUsers } from '../../lib/data/users';

export async function UserList() {
  const users = await getUsers();
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2 text-left">Naam</th>
          <th className="p-2 text-left">E-mail</th>
          <th className="p-2 text-left">Rol</th>
          <th className="p-2 text-left">Aangemaakt</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.role}</td>
            <td className="p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

