import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary-600 via-brand-primary-700 to-brand-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Unlock the Power of
              <span className="text-brand-secondary-400"> AI-Driven Insights</span>
            </h1>
            <p className="text-lg sm:text-xl text-brand-primary-200 mb-10 leading-relaxed">
              Transform your data into actionable intelligence. Our platform helps teams
              make smarter decisions faster with advanced analytics and AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="w-full sm:w-auto px-8 py-3 text-lg bg-brand-secondary-500 hover:bg-brand-secondary-600 text-neutral-900 font-bold rounded-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto px-8 py-3 text-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-primary-700 rounded-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Powerful features designed to help you manage users, generate insights,
              and grow your business.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-brand-primary-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">User Management</h3>
              <p className="text-neutral-500 leading-relaxed">
                Effortlessly manage your team members with powerful user administration tools.
                Create, update, and organize users with ease.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-brand-accent-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">AI Insights</h3>
              <p className="text-neutral-500 leading-relaxed">
                Generate meaningful insights from your data using advanced AI algorithms.
                Discover trends and patterns you never knew existed.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-brand-secondary-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Analytics Dashboard</h3>
              <p className="text-neutral-500 leading-relaxed">
                Monitor key metrics and performance indicators with a beautiful,
                real-time dashboard that keeps you in the loop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-primary-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-primary-600 mb-2">10k+</div>
              <div className="text-neutral-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary-600 mb-2">50M+</div>
              <div className="text-neutral-600">Insights Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary-600 mb-2">99.9%</div>
              <div className="text-neutral-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary-600 mb-2">150+</div>
              <div className="text-neutral-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-neutral-500 mb-8">
            Join thousands of teams already using AI App to drive better outcomes.
          </p>
          <Link to="/register">
            <Button className="px-8 py-3 text-lg bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
