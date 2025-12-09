import { ExampleCard } from "components/example/example-card";

export default function ExamplePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-3xl font-bold mb-6">Voorbeeld Feature Pagina</h1>
      <ExampleCard />
    </div>
  );
}
