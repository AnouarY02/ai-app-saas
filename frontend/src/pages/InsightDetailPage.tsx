import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getInsight, deleteInsight } from '@/utils/apiClient';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';

const InsightDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchInsight = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getInsight(id);
        setInsight(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to load insight.');
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this insight? This action cannot be undone.')) return;
    try {
      setDeleting(true);
      await deleteInsight(id);
      navigate('/dashboard/insights');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete insight.');
      setDeleting(false);
    }
  };

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
        <div className="mt-4">
          <Link to="/dashboard/insights" className="text-brand-primary-500 hover:underline text-sm">
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Alert type="error" message="Insight not found." />
        <div className="mt-4">
          <Link to="/dashboard/insights" className="text-brand-primary-500 hover:underline text-sm">
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-neutral-500">
        <Link to="/dashboard/insights" className="hover:text-brand-primary-500">Insights</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{insight.title || 'Insight Detail'}</span>
      </nav>

      <Card>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                {insight.title || 'Untitled Insight'}
              </h1>
              <div className="flex items-center gap-3">
                {insight.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent-100 text-brand-accent-700">
                    {insight.category}
                  </span>
                )}
                {insight.createdAt && (
                  <span className="text-sm text-neutral-400">
                    Created {new Date(insight.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 ml-4">
              <Link to={`/dashboard/insights/${id}/edit`}>
                <Button className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
                  Edit
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="border-t border-neutral-100 pt-6">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Content
            </label>
            <div className="prose max-w-none text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {insight.content || 'No content available.'}
            </div>
          </div>

          {/* Metadata */}
          {(insight.author || insight.userId || insight.updatedAt) && (
            <div className="border-t border-neutral-100 pt-6 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(insight.author || insight.userId) && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Author
                    </label>
                    <p className="text-sm text-neutral-900">{insight.author || insight.userId || 'N/A'}</p>
                  </div>
                )}
                {insight.updatedAt && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Last Updated
                    </label>
                    <p className="text-sm text-neutral-900">
                      {new Date(insight.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {insight.status && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Status
                    </label>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {insight.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-6">
        <Link to="/dashboard/insights" className="text-sm text-brand-primary-500 hover:underline">
          &larr; Back to Insights
        </Link>
      </div>
    </div>
  );
};

export default InsightDetailPage;
