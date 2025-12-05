import { getCurrentUser } from '../../../lib/auth';
import { PromptList } from '../../../components/prompts/prompt-list';
import { PromptForm } from '../../../components/prompts/prompt-form';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welkom, {user?.name || user?.email}!</p>
      </div>
      <PromptForm />
      <PromptList />
    </div>
  );
}

