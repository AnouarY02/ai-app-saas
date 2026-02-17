import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '@/utils/apiClient';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      setDeletingId(id);
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => (u.id || u._id) !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete user.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Users</h1>
          <p className="text-neutral-500 mt-1">Manage all users in your workspace.</p>
        </div>
        <Link to="/dashboard/users/new">
          <Button className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
            + Add User
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} />
        </div>
      )}

      {users.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <h3 className="text-lg font-medium text-neutral-900 mb-1">No users yet</h3>
          <p className="text-neutral-500 mb-4">Get started by creating your first user.</p>
          <Link to="/dashboard/users/new">
            <Button className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
              Create User
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.map((user: any) => {
                const userId = user.id || user._id;
                return (
                  <tr key={userId} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-primary-100 rounded-full flex items-center justify-center text-brand-primary-600 font-semibold text-sm">
                          {(user.name || user.email || '?').charAt(0).toUpperCase()}
                        </div>
                        <Link
                          to={`/dashboard/users/${userId}`}
                          className="text-sm font-medium text-neutral-900 hover:text-brand-primary-600"
                        >
                          {user.name || 'Unnamed'}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary-100 text-brand-primary-700">
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/dashboard/users/${userId}`}
                          className="text-sm text-neutral-500 hover:text-brand-primary-600"
                        >
                          View
                        </Link>
                        <Link
                          to={`/dashboard/users/${userId}/edit`}
                          className="text-sm text-neutral-500 hover:text-brand-primary-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(userId)}
                          disabled={deletingId === userId}
                          className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          {deletingId === userId ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
