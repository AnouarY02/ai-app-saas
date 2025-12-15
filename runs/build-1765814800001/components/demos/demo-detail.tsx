import { DemoPage } from '../../lib/types';
import { marked } from 'marked';

export default function DemoDetail({ demo }: { demo: DemoPage }) {
  return (
    <article className="prose max-w-2xl mx-auto">
      <h1>{demo.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked.parse(demo.content) }} />
      <p className="mt-6 text-sm text-gray-400">Aangemaakt op {new Date(demo.createdAt).toLocaleDateString()}</p>
    </article>
  );
}

