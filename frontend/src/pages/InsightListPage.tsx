import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInsights, deleteInsight } from '@/utils/apiClient';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

const InsightListPage: React.FC = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInsights();
      setInsights(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load insights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this insight?')) return;
    try {
      setDeletingId(id);
      await deleteInsight(id);
      setInsights((prev) => prev.filter((i) => (i.id || i._id) !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete insight.');
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
          <h1 className="text-2xl font-bold text-neutral-900">Insights</h1>
          <p className="text-neutral-500 mt-1">Browse and manage AI-generated insights.</p>
        </div>
        <Link to="/dashboard/insights/new">
          <Button className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
            + New Insight
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} />
        </div>
      )}

      {insights.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-medium text-neutral-900 mb-1">No insights yet</h3>
          <p className="text-neutral-500 mb-4">Create your first insight to get started.</p>
          <Link to="/dashboard/insights/new">
            <Button className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
              Create Insight
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight: any) => {
            const insightId = insight.id || insight._id;
            return (
              <div
                key={insightId}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <Link
                      to={`/dashboard/insights/${insightId}`}
                      className="text-lg font-semibold text-neutral-900 hover:text-brand-primary-600 line-clamp-2"
                    >
                      {insight.title || 'Untitled Insight'}
                    </Link>
                  </div>
                  <p className="text-sm text-neutral-500 line-clamp-3 mb-4">
                    {insight.content || 'No content available.'}
                  </p>
                  {insight.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent-100 text-brand-accent-700">
                      {insight.category}
                    </span>
                  )}
                  {insight.createdAt && (
                    <p className="text-xs text-neutral-400 mt-3">
                      {new Date(insight.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="border-t border-neutral-100 px-5 py-3 flex items-center justify-between bg-neutral-50">
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/dashboard/insights/${insightId}`}
                      className="text-sm text-brand-primary-500 hover:text-brand-primary-600 font-medium"
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/insights/${insightId}/edit`}
                      className="text-sm text-neutral-500 hover:text-brand-primary-600"
                    >
                      Edit
                    </Link>
                  </div>
                  <button
                    onClick={() => handleDelete(insightId)}
                    disabled={deletingId === insightId}
                    className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    {deletingId === insightId ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InsightListPage;
