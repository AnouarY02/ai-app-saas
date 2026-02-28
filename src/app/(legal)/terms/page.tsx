import Link from 'next/link'

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-8">Algemene Voorwaarden</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-600">
          <p><strong>Laatst bijgewerkt:</strong> Februari 2026</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">1. Dienst</h2>
          <p>
            VOLT Sleep biedt een app voor energieoptimalisatie via slaapgedrag.
            De app geeft adviezen gebaseerd op algemene gedragsprincipes.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">2. Geen medisch advies</h2>
          <p className="font-semibold text-gray-900">
            VOLT Sleep is GEEN medisch hulpmiddel, biedt GEEN diagnose en GEEN behandeling.
          </p>
          <p>
            Onze adviezen zijn gebaseerd op algemeen beschikbare gedragswetenschappelijke
            principes (gedragsverandering, slaaphygiëne, chronobiologie). Wij zijn geen
            arts, psycholoog of therapeut.
          </p>
          <p>
            Bij ernstige slaapproblemen, aanhoudende vermoeidheid, of mentale klachten
            adviseren wij dringend contact op te nemen met je huisarts of een gekwalificeerde
            professional.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">3. Abonnementen</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Gratis plan: beperkte functies, 7 dagen geschiedenis.</li>
            <li>Premium: €9,99/maand of €69/jaar. Inclusief 7 dagen gratis proefperiode.</li>
            <li>Annuleren kan op elk moment via Instellingen of Stripe portal.</li>
            <li>Bij annulering behoud je toegang tot het einde van de betaalperiode.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">4. Aansprakelijkheid</h2>
          <p>
            VOLT Sleep aanvaardt geen aansprakelijkheid voor schade voortvloeiend uit het
            gebruik van de app. De adviezen zijn informatief en niet bindend.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">5. Privacy</h2>
          <p>
            Zie ons <Link href="/privacy" className="text-volt-600 underline">Privacybeleid</Link> voor
            informatie over hoe wij omgaan met je gegevens.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">6. Contact</h2>
          <p>
            Vragen? Neem contact op via{' '}
            <a href="mailto:support@voltsleep.nl" className="text-volt-600 underline">support@voltsleep.nl</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
