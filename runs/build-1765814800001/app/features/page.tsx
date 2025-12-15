import FeatureList from '../../components/features/feature-list';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Features</h1>
        <Link href="/features/new" className="btn btn-primary">Nieuwe feature</Link>
      </div>
      <FeatureList />
    </div>
  );
}

