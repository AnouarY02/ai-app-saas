import { PromptList } from '../../../components/prompts/prompt-list';
import { PromptForm } from '../../../components/prompts/prompt-form';

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Mijn AI-prompts</h2>
      <PromptForm />
      <PromptList />
    </div>
  );
}

