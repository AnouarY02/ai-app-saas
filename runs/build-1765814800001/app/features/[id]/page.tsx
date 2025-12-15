import FeatureForm from '../../../components/features/feature-form';
import { getFeatureById } from '../../../lib/features';
import { notFound } from 'next/navigation';

export default async function FeatureDetailPage({ params }: { params: { id: string } }) {
  const feature = await getFeatureById(params.id);
  if (!feature) return notFound();
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feature bewerken</h1>
      <FeatureForm feature={feature} />
    </div>
  );
}

