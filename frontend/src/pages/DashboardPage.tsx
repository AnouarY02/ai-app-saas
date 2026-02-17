import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getInsights } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';

const DashboardPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [usersData, insightsData] = await Promise.all([
          getUsers(),
          getInsights(),
        ]);
        setUsers(Array.isArray(usersData) ? usersData : usersData.data || []);
        setInsights(Array.isArray(insightsData) ? insightsData : insightsData.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h1>
        <p className="text-neutral-500 mt-1">Welcome back. Here is a summary of your workspace.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-primary-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Users</p>
              <p className="text-2xl font-bold text-neutral-900">{users.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-accent-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Insights</p>
              <p className="text-2xl font-bold text-neutral-900">{insights.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Active</p>
              <p className="text-2xl font-bold text-neutral-900">{users.filter((u: any) => u.status === 'active').length || users.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-secondary-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Growth</p>
              <p className="text-2xl font-bold text-neutral-900">+12%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="p-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Recent Users</h2>
              <Link to="/dashboard/users" className="text-sm text-brand-primary-500 hover:text-brand-primary-600 font-medium">
                View All
              </Link>
            </div>
            {users.length === 0 ? (
              <p className="text-neutral-400 text-sm py-4">No users found.</p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {users.slice(0, 5).map((user: any) => (
                  <li key={user.id || user._id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-primary-100 rounded-full flex items-center justify-center text-brand-primary-600 font-semibold text-sm">
                        {(user.name || user.email || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{user.name || 'Unnamed'}</p>
                        <p className="text-xs text-neutral-400">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to={`/dashboard/users/${user.id || user._id}`}
                      className="text-xs text-brand-primary-500 hover:underline"
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <Card>
          <div className="p-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Recent Insights</h2>
              <Link to="/dashboard/insights" className="text-sm text-brand-primary-500 hover:text-brand-primary-600 font-medium">
                View All
              </Link>
            </div>
            {insights.length === 0 ? (
              <p className="text-neutral-400 text-sm py-4">No insights found.</p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {insights.slice(0, 5).map((insight: any) => (
                  <li key={insight.id || insight._id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{insight.title || 'Untitled'}</p>
                      <p className="text-xs text-neutral-400 truncate max-w-xs">
                        {insight.content?.substring(0, 80) || 'No content'}
                      </p>
                    </div>
                    <Link
                      to={`/dashboard/insights/${insight.id || insight._id}`}
                      className="text-xs text-brand-primary-500 hover:underline flex-shrink-0 ml-4"
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/dashboard/users/new"
          className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-neutral-200"
        >
          <div className="w-10 h-10 bg-brand-primary-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-sm font-medium text-neutral-700">Add User</span>
        </Link>
        <Link
          to="/dashboard/insights/new"
          className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-neutral-200"
        >
          <div className="w-10 h-10 bg-brand-accent-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-sm font-medium text-neutral-700">New Insight</span>
        </Link>
        <Link
          to="/dashboard/users"
          className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-neutral-200"
        >
          <div className="w-10 h-10 bg-brand-secondary-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <span className="text-sm font-medium text-neutral-700">Manage Users</span>
        </Link>
        <Link
          to="/dashboard/insights"
          className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-neutral-200"
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <span className="text-sm font-medium text-neutral-700">Manage Insights</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
