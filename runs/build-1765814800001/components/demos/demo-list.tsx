import Link from 'next/link';
import { getDemos } from '../../lib/demos';

export default async function DemoList({ limit }: { limit?: number }) {
  const demos = await getDemos(limit);
  if (!demos.length) return <div>Geen demo's gevonden.</div>;
  return (
    <ul className="divide-y">
      {demos.map(d => (
        <li key={d.id} className="py-3">
          <Link href={`/demos/${d.id}`} className="font-medium hover:underline">
            {d.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

