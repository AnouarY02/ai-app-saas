import Link from 'next/link'

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-600">
          <p><strong>Last updated:</strong> February 2026</p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">1. Who are we?</h2>
          <p>
            VOLT Sleep is an energy optimization app based on evidence-based behavioral principles.
            We are based in the Netherlands and comply with GDPR/AVG.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">2. What data do we collect?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account data:</strong> email address (for authentication via magic link).</li>
            <li><strong>Onboarding profile:</strong> sleep times, caffeine habits, chronotype, energy level, stress level, goals.</li>
            <li><strong>Daily check-ins:</strong> wake time, bedtime, energy scores, stress scores, screen usage.</li>
            <li><strong>Usage data:</strong> which actions you complete, when you open the app (anonymized).</li>
            <li><strong>Payment data:</strong> processed by Stripe. We do not store credit card details.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">3. How do we use your data?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personalizing your Daily Energy Card and recommendations.</li>
            <li>Generating Weekly Energy Reports (premium).</li>
            <li>Improving our algorithms (anonymized).</li>
            <li>Communication about your account and service updates.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">4. Do we share your data?</h2>
          <p>
            <strong>No.</strong> We do not sell, rent, or share your personal data with third parties
            for marketing purposes. We use:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Supabase:</strong> for storage (EU servers).</li>
            <li><strong>Stripe:</strong> for payment processing.</li>
            <li><strong>Vercel:</strong> for hosting.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">5. Your rights (GDPR)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Access:</strong> you can request your data.</li>
            <li><strong>Correction:</strong> you can have incorrect data corrected.</li>
            <li><strong>Deletion:</strong> you can have your account and all associated data deleted via Settings.</li>
            <li><strong>Export:</strong> you can request a data export.</li>
            <li><strong>Objection:</strong> you can object to processing.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">6. Security</h2>
          <p>
            We use encryption in transit (HTTPS) and at rest. Database access is limited
            to authorized systems. We follow security best practices.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">7. Contact</h2>
          <p>
            Questions about your privacy? Contact us at{' '}
            <a href="mailto:privacy@voltsleep.nl" className="text-volt-600 underline">privacy@voltsleep.nl</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
