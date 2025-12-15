import Link from 'next/link';
import { getFeatures } from '../../lib/features';

export default async function FeatureList({ limit }: { limit?: number }) {
  const features = await getFeatures(limit);
  if (!features.length) return <div>Geen features gevonden.</div>;
  return (
    <ul className="divide-y">
      {features.map(f => (
        <li key={f.id} className="py-3 flex items-center justify-between">
          <div>
            <Link href={`/features/${f.id}`} className="font-medium hover:underline">
              {f.name}
            </Link>
            {f.description && <p className="text-sm text-gray-500">{f.description}</p>}
          </div>
          <span className={f.enabled ? 'text-green-600' : 'text-gray-400'}>
            {f.enabled ? 'Actief' : 'Uitgeschakeld'}
          </span>
        </li>
      ))}
    </ul>
  );
}

