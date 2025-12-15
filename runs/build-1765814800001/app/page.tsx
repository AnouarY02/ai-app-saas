import FeatureList from '../components/features/feature-list';
import DemoList from '../components/demos/demo-list';

export default async function DashboardPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <FeatureList limit={5} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Demo's</h2>
        <DemoList limit={5} />
      </section>
    </div>
  );
}

