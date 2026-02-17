import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary-600 to-brand-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            About AI App
          </h1>
          <p className="text-lg sm:text-xl text-brand-primary-200 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to democratize AI-powered analytics, making data-driven
            decision making accessible to every team, everywhere.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                AI App was founded with a simple belief: every organization deserves access
                to powerful AI-driven insights, regardless of their size or technical expertise.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                What started as a small project to help teams understand their data has grown
                into a comprehensive platform used by thousands of organizations worldwide.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Our team combines deep expertise in artificial intelligence, data science,
                and user experience design to deliver a product that is both powerful and
                delightfully simple to use.
              </p>
            </div>
            <div className="bg-brand-primary-50 rounded-2xl p-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary-600 mb-1">2021</div>
                  <div className="text-sm text-neutral-500">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary-600 mb-1">50+</div>
                  <div className="text-sm text-neutral-500">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary-600 mb-1">10k+</div>
                  <div className="text-sm text-neutral-500">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary-600 mb-1">150+</div>
                  <div className="text-sm text-neutral-500">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Values</h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-brand-primary-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Trust & Transparency</h3>
              <p className="text-neutral-500 leading-relaxed">
                We believe in being open about how our AI works and how your data is handled.
                Your trust is our most valuable asset.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-brand-accent-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Innovation First</h3>
              <p className="text-neutral-500 leading-relaxed">
                We push the boundaries of what AI can achieve, constantly exploring new ways
                to deliver value to our customers.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-brand-secondary-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Customer Success</h3>
              <p className="text-neutral-500 leading-relaxed">
                Your success is our success. We provide dedicated support and resources
                to help you get the most out of our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Want to Join Our Journey?
          </h2>
          <p className="text-lg text-neutral-500 mb-8">
            Start using AI App today and see how AI-powered insights can transform your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="px-8 py-3 text-lg bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="secondary" className="px-8 py-3 text-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
