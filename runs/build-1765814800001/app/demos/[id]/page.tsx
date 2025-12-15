import DemoDetail from '../../../components/demos/demo-detail';
import { getDemoById } from '../../../lib/demos';
import { notFound } from 'next/navigation';

export default async function DemoDetailPage({ params }: { params: { id: string } }) {
  const demo = await getDemoById(params.id);
  if (!demo) return notFound();
  return <DemoDetail demo={demo} />;
}

