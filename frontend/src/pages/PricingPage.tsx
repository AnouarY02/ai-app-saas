import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals and small teams getting started.',
    features: [
      'Up to 5 users',
      '100 insights per month',
      'Basic analytics dashboard',
      'Email support',
      'Community access',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per user / month',
    description: 'For growing teams that need more power and flexibility.',
    features: [
      'Unlimited users',
      'Unlimited insights',
      'Advanced analytics & reports',
      'Priority email & chat support',
      'API access',
      'Custom integrations',
      'Team collaboration tools',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations with advanced security and compliance needs.',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'SSO & SAML authentication',
      'Advanced security controls',
      'Custom SLA',
      'On-premise deployment option',
      'Audit logs & compliance',
      'Training & onboarding',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const PricingPage: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-primary-600 to-brand-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-brand-primary-200 max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
            Start free and scale as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  tier.highlighted
                    ? 'bg-brand-primary-600 text-white shadow-xl scale-105 ring-4 ring-brand-primary-300'
                    : 'bg-white shadow-md'
                }`}
              >
                <div className="mb-6">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      tier.highlighted ? 'text-brand-primary-100' : 'text-neutral-500'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className={`text-4xl font-extrabold ${
                        tier.highlighted ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span
                      className={`text-sm ${
                        tier.highlighted ? 'text-brand-primary-200' : 'text-neutral-400'
                      }`}
                    >
                      {tier.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      tier.highlighted ? 'text-brand-primary-200' : 'text-neutral-500'
                    }`}
                  >
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? 'text-brand-secondary-400' : 'text-brand-primary-500'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          tier.highlighted ? 'text-brand-primary-100' : 'text-neutral-600'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button
                    className={`w-full py-3 rounded-lg font-semibold ${
                      tier.highlighted
                        ? 'bg-white text-brand-primary-600 hover:bg-brand-primary-50'
                        : 'bg-brand-primary-500 text-white hover:bg-brand-primary-600'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-neutral-500">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect
                at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Is there a free trial for the Professional plan?
              </h3>
              <p className="text-neutral-500">
                Yes! The Professional plan comes with a 14-day free trial. No credit card
                required to get started.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                What happens when I exceed my insight limit on the Starter plan?
              </h3>
              <p className="text-neutral-500">
                You will receive a notification when you reach 80% of your limit. Once the
                limit is reached, you can upgrade to continue generating insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-neutral-500">
                We offer a 30-day money-back guarantee on all paid plans. If you are not
                satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
