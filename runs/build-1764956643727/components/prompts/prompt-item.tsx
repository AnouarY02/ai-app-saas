import { Prompt } from '../../lib/types';

interface PromptItemProps {
  prompt: Prompt;
}

export function PromptItem({ prompt }: PromptItemProps) {
  return (
    <li className="border rounded p-4 bg-white shadow-sm">
      <div className="text-sm text-gray-600 mb-2">{new Date(prompt.createdAt).toLocaleString('nl-NL')}</div>
      <div className="font-medium mb-2">Prompt:</div>
      <div className="mb-2 whitespace-pre-line">{prompt.input}</div>
      {prompt.output && (
        <>
          <div className="font-medium mt-2">AI Output:</div>
          <div className="bg-gray-50 p-2 rounded text-gray-800 whitespace-pre-line">{prompt.output}</div>
        </>
      )}
    </li>
  );
}

