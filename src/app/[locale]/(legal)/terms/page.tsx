import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="./" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-volt-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold">VOLT Sleep</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-600">
          <p><strong>Last updated:</strong> February 2026</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">1. Service</h2>
          <p>
            VOLT Sleep provides an app for energy optimization through sleep behavior.
            The app gives advice based on general behavioral principles.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">2. No medical advice</h2>
          <p className="font-semibold text-gray-900">
            VOLT Sleep is NOT a medical device, does NOT provide diagnosis, and does NOT provide treatment.
          </p>
          <p>
            Our advice is based on publicly available behavioral science
            principles (behavior change, sleep hygiene, chronobiology). We are not
            doctors, psychologists, or therapists.
          </p>
          <p>
            For serious sleep problems, persistent fatigue, or mental health issues,
            we strongly advise contacting your doctor or a qualified professional.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">3. Subscriptions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Free plan: limited features, 7-day history.</li>
            <li>Premium: &euro;9.99/month or &euro;69/year. Includes 7-day free trial.</li>
            <li>Cancel anytime via Settings or the Stripe portal.</li>
            <li>Upon cancellation, you retain access until the end of the billing period.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">4. Liability</h2>
          <p>
            VOLT Sleep accepts no liability for damages arising from use of the app.
            The advice is informational and non-binding.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">5. Privacy</h2>
          <p>
            See our <Link href="privacy" className="text-volt-600 underline">Privacy Policy</Link> for
            information on how we handle your data.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">6. Contact</h2>
          <p>
            Questions? Contact us at{' '}
            <a href="mailto:support@voltsleep.nl" className="text-volt-600 underline">support@voltsleep.nl</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
