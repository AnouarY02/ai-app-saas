import { PromptItem } from './prompt-item';
import { getPrompts } from '../../lib/prompts';

export async function PromptList() {
  const prompts = await getPrompts();
  if (!prompts || prompts.length === 0) {
    return <div className="text-gray-500">Nog geen prompts.</div>;
  }
  return (
    <ul className="space-y-4">
      {prompts.map(prompt => (
        <PromptItem key={prompt.id} prompt={prompt} />
      ))}
    </ul>
  );
}

