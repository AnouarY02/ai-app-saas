import Link from 'next/link'

const HERO_VARIANTS = [
  {
    headline: 'Stop de middagdip.',
    sub: 'VOLT Sleep geeft je elke dag 1 actie voor meer energie. Evidence-based, geen zweverig gedoe.',
  },
  {
    headline: 'Energie is ritme + keuzes.',
    sub: 'Ontdek waarom je moe bent en wat je er vandaag aan kunt doen. In 45 seconden per dag.',
  },
  {
    headline: 'Wakker met energie. Elke dag.',
    sub: 'Jouw persoonlijke energy coach. Gebaseerd op gedragswetenschap, niet op giswerk.',
  },
]

export default function LandingPage() {
  const hero = HERO_VARIANTS[2]

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-volt-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="font-bold text-xl">VOLT Sleep</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Inloggen
          </Link>
          <Link href="/signup" className="btn-primary text-sm">
            Start gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-volt-50 text-volt-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-volt-500 rounded-full" />
          Evidence-based energy coaching
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          {hero.headline}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn-primary text-lg px-8 py-4">
            Start gratis — 30 seconden
          </Link>
          <a href="#how" className="btn-secondary text-lg px-8 py-4">
            Hoe werkt het?
          </a>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-volt-600">45s</div>
            <div className="text-sm text-gray-500 mt-1">per dag nodig</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-volt-600">1 actie</div>
            <div className="text-sm text-gray-500 mt-1">concreet & haalbaar</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-volt-600">7 dagen</div>
            <div className="text-sm text-gray-500 mt-1">eerste resultaat</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Zo werkt VOLT Sleep
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Vertel ons over je ritme',
                desc: '5 minuten onboarding. Geen wearable nodig. Wij maken je Energy Profile.',
              },
              {
                step: '2',
                title: 'Ontvang je Daily Energy Card',
                desc: 'Elke ochtend 1 concrete actie. Met uitleg waarom het werkt en een if-then plan.',
              },
              {
                step: '3',
                title: 'Check in, verbeter, herhaal',
                desc: '10 seconden check-in. Het systeem leert van je patronen en past zich aan.',
              },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="w-12 h-12 bg-volt-100 text-volt-700 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Waarom VOLT Sleep anders is
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Geen tracking-overload',
              desc: 'Andere apps geven je 20 grafieken. Wij geven je 1 actie die er echt toe doet.',
            },
            {
              title: 'Adaptief, niet statisch',
              desc: 'Je plan past zich aan op basis van je check-ins. Slecht geslapen? Ander advies.',
            },
            {
              title: 'Gedragswetenschap, geen giswerk',
              desc: 'Gebouwd op COM-B, BCT Taxonomy, CBT-I principes en Self-Determination Theory.',
            },
            {
              title: 'Energie, niet angst',
              desc: 'We focussen op hoe je je overdag voelt. Geen scary slaapscores of schaamte.',
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simpel. Eerlijk. Effectief.</h2>
          <p className="text-gray-500 mb-12">
            Start gratis. Upgrade wanneer je klaar bent voor meer.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="card text-left">
              <div className="text-sm font-medium text-gray-500 mb-2">Gratis</div>
              <div className="text-3xl font-bold mb-4">
                €0<span className="text-base font-normal text-gray-400">/maand</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Daily Energy Card
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> Ochtend & avond check-in
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> 7 dagen geschiedenis
                </li>
              </ul>
              <Link href="/signup" className="btn-secondary w-full block text-center">
                Start gratis
              </Link>
            </div>
            <div className="card-elevated text-left border-2 border-volt-400 relative">
              <div className="absolute -top-3 left-4 bg-volt-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAIR
              </div>
              <div className="text-sm font-medium text-volt-600 mb-2">Premium</div>
              <div className="text-3xl font-bold mb-1">
                €9,99<span className="text-base font-normal text-gray-400">/maand</span>
              </div>
              <div className="text-sm text-gray-400 mb-4">of €69/jaar (bespaar 42%)</div>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> Alles van Gratis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> Adaptive Decision Engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> Weekly Energy Report
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> Cognitive Switch tool
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> Onbeperkte geschiedenis
                </li>
              </ul>
              <Link href="/signup?plan=premium" className="btn-primary w-full block text-center">
                Start Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-8 max-w-4xl mx-auto text-center">
        <p className="text-xs text-gray-400 leading-relaxed max-w-xl mx-auto">
          VOLT Sleep is geen medisch hulpmiddel en biedt geen diagnose of behandeling.
          Onze adviezen zijn gebaseerd op algemene gedragsprincipes voor energieoptimalisatie.
          Bij ernstige slaapproblemen raden we aan contact op te nemen met je huisarts.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-volt-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">V</span>
            </div>
            <span className="font-semibold">VOLT Sleep</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Voorwaarden</Link>
            <a href="mailto:support@voltsleep.nl">Contact</a>
          </div>
          <div className="text-xs text-gray-400">
            © 2026 VOLT Sleep. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>
    </div>
  )
}
