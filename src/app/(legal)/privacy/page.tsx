import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-volt-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold">VOLT Sleep</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacybeleid</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-600">
          <p><strong>Laatst bijgewerkt:</strong> Februari 2026</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">1. Wie zijn wij?</h2>
          <p>
            VOLT Sleep is een energieoptimalisatie-app gebaseerd op evidence-based gedragsprincipes.
            Wij zijn gevestigd in Nederland en vallen onder de AVG/GDPR.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">2. Welke gegevens verzamelen wij?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Accountgegevens:</strong> e-mailadres (voor authenticatie via magic link).</li>
            <li><strong>Onboarding profiel:</strong> slaaptijden, cafeïnegewoontes, chronotype, energieniveau, stressniveau, doelen.</li>
            <li><strong>Dagelijkse check-ins:</strong> opstaantijd, bedtijd, energiescores, stresscores, schermgebruik.</li>
            <li><strong>Gebruiksdata:</strong> welke acties je voltooit, wanneer je de app opent (geanonimiseerd).</li>
            <li><strong>Betalingsgegevens:</strong> worden verwerkt door Stripe. Wij slaan geen creditcardgegevens op.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">3. Waarvoor gebruiken wij je gegevens?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Het personaliseren van je Daily Energy Card en adviezen.</li>
            <li>Het genereren van Weekly Energy Reports (premium).</li>
            <li>Het verbeteren van onze algoritmes (geanonimiseerd).</li>
            <li>Communicatie over je account en service-updates.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">4. Delen wij je gegevens?</h2>
          <p>
            <strong>Nee.</strong> Wij verkopen, verhuren of delen je persoonlijke gegevens niet met derden
            voor marketingdoeleinden. Wij gebruiken:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Supabase:</strong> voor opslag (EU servers).</li>
            <li><strong>Stripe:</strong> voor betalingsverwerking.</li>
            <li><strong>Vercel:</strong> voor hosting.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">5. Je rechten (GDPR/AVG)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Inzage:</strong> je kunt je gegevens opvragen.</li>
            <li><strong>Correctie:</strong> je kunt onjuiste gegevens laten corrigeren.</li>
            <li><strong>Verwijdering:</strong> je kunt je account en alle bijbehorende gegevens laten verwijderen via Instellingen.</li>
            <li><strong>Export:</strong> je kunt een export van je gegevens opvragen.</li>
            <li><strong>Bezwaar:</strong> je kunt bezwaar maken tegen verwerking.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">6. Beveiliging</h2>
          <p>
            Wij gebruiken encryptie in transit (HTTPS) en at rest. Toegang tot databases is beperkt
            tot geautoriseerde systemen. Wij volgen security best practices.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">7. Contact</h2>
          <p>
            Vragen over je privacy? Neem contact op via{' '}
            <a href="mailto:privacy@voltsleep.nl" className="text-volt-600 underline">privacy@voltsleep.nl</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
