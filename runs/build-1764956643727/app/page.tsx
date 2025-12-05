export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-16">
      <h1 className="text-4xl font-bold text-center">Welkom bij AI App</h1>
      <p className="text-lg text-center max-w-xl">
        Een eenvoudige SaaS-app voor het beheren van AI-prompts. Registreer of log in om je prompts te beheren en AI-output te genereren.
      </p>
      <div className="flex gap-4">
        <a href="/register" className="btn btn-primary">Registreren</a>
        <a href="/login" className="btn btn-outline">Inloggen</a>
      </div>
    </section>
  );
}

