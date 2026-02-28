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
          <p className="font-semibold text-gray-900">
            VOLT Sleep is NOT a medical device. It does NOT provide diagnosis, treatment, or medical advice.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">2. What data do we collect?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account data:</strong> email address (for authentication via magic link).</li>
            <li><strong>Onboarding profile:</strong> sleep times, caffeine habits, chronotype, energy level, stress level, goals.</li>
            <li><strong>Daily check-ins:</strong> wake time, bedtime, energy scores, stress scores, screen usage.</li>
            <li><strong>Usage data:</strong> which actions you complete, when you open the app (anonymized).</li>
            <li><strong>Payment data:</strong> processed by Stripe (web), Apple (iOS), or Google (Android). We do not store credit card details.</li>
            <li><strong>Device data (mobile only):</strong> push notification token, platform type. No device identifiers or IDFA/GAID collected without consent.</li>
            <li><strong>Health data (optional):</strong> if you connect Apple Health or Google Fit, we read sleep duration only (read-only). We never write to your health data.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">3. How do we use your data?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personalizing your Daily Energy Card and recommendations.</li>
            <li>Generating Weekly Energy Reports (premium).</li>
            <li><strong>AI processing:</strong> for premium users, your check-in data and energy profile are sent to our AI provider (Anthropic) to generate personalized insights. No personally identifiable information (name, email) is included in AI requests. Only behavioral data (sleep times, energy scores) is processed.</li>
            <li>Improving our algorithms (anonymized and aggregated).</li>
            <li>Communication about your account and service updates.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">4. AI Processing</h2>
          <p>
            VOLT Sleep uses artificial intelligence to generate personalized energy recommendations.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>What is sent:</strong> anonymized behavioral data (sleep times, energy scores, caffeine habits). No name, email, or IP address is sent.</li>
            <li><strong>Provider:</strong> Anthropic (Claude). Based in the USA, with EU-adequate data protections.</li>
            <li><strong>Retention:</strong> AI requests are not stored by the provider beyond the processing window.</li>
            <li><strong>Opt-out:</strong> free users never have data sent to AI. Premium users can disable AI features in Settings (the app falls back to rule-based recommendations).</li>
            <li><strong>No profiling:</strong> we do not use AI for automated decision-making that produces legal or significant effects on you.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">5. Do we share your data?</h2>
          <p>
            <strong>No.</strong> We do not sell, rent, or share your personal data with third parties
            for marketing purposes. We use the following data processors:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Supabase:</strong> database storage (EU region).</li>
            <li><strong>Stripe:</strong> web payment processing (PCI DSS compliant).</li>
            <li><strong>Apple:</strong> iOS payment processing and push notifications.</li>
            <li><strong>Google:</strong> Android payment processing and push notifications.</li>
            <li><strong>Anthropic:</strong> AI text generation (premium features only).</li>
            <li><strong>Vercel:</strong> web hosting.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">6. Data retention</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Active accounts:</strong> data retained while your account is active.</li>
            <li><strong>After deletion:</strong> all personal data is permanently deleted within 30 days of account deletion. Aggregated, anonymized statistics may be retained.</li>
            <li><strong>Payment records:</strong> retained for 7 years as required by Dutch tax law.</li>
            <li><strong>Analytics events:</strong> anonymized after 90 days.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">7. Your rights (GDPR)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Access (Art. 15):</strong> download all your data via Settings &gt; Export Data.</li>
            <li><strong>Correction (Art. 16):</strong> update your profile in Settings.</li>
            <li><strong>Deletion (Art. 17):</strong> delete your account and all data via Settings &gt; Delete Account.</li>
            <li><strong>Portability (Art. 20):</strong> export your data as JSON via Settings &gt; Export Data.</li>
            <li><strong>Objection (Art. 21):</strong> contact privacy@voltsleep.nl.</li>
            <li><strong>Withdraw consent (Art. 7):</strong> manage cookie preferences at any time.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">8. Cookies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Necessary:</strong> authentication session, locale preference. Cannot be disabled.</li>
            <li><strong>Analytics (opt-in):</strong> usage patterns to improve the app. No personal identifiers.</li>
            <li><strong>Marketing (opt-in):</strong> conversion tracking for advertising. Only with explicit consent.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">9. Security</h2>
          <p>
            We use encryption in transit (TLS 1.3) and at rest. Database access is limited
            to authorized systems via Row-Level Security. API endpoints are rate-limited
            and protected against abuse. Security headers include CSP, HSTS, and X-Frame-Options.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">10. Children</h2>
          <p>
            VOLT Sleep is not intended for users under 16 years of age. We do not knowingly
            collect data from children.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mt-8">11. Contact</h2>
          <p>
            Questions about your privacy? Contact us at{' '}
            <a href="mailto:privacy@voltsleep.nl" className="text-volt-600 underline">privacy@voltsleep.nl</a>.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Supervisory authority: Autoriteit Persoonsgegevens (Dutch Data Protection Authority).
          </p>
        </div>
      </div>
    </div>
  )
}
