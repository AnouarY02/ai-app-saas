'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/context'

export default function LandingPage() {
  const { t } = useTranslations()

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-volt-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="font-bold text-xl">{t('common.appName')}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="login"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            {t('common.login')}
          </Link>
          <Link href="signup" className="btn-primary text-sm">
            {t('landing.hero.cta')}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-volt-50 text-volt-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-volt-500 rounded-full" />
          {t('landing.badge')}
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          {t('landing.hero.headline')}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('landing.hero.sub')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="signup" className="btn-primary text-lg px-8 py-4">
            {t('landing.hero.cta')}
          </Link>
          <a href="#how" className="btn-secondary text-lg px-8 py-4">
            {t('landing.hero.ctaSecondary')}
          </a>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-volt-600">{t('landing.stats.time')}</div>
            <div className="text-sm text-gray-500 mt-1">{t('landing.stats.timeLabel')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-volt-600">{t('landing.stats.action')}</div>
            <div className="text-sm text-gray-500 mt-1">{t('landing.stats.actionLabel')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-volt-600">{t('landing.stats.result')}</div>
            <div className="text-sm text-gray-500 mt-1">{t('landing.stats.resultLabel')}</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('landing.howItWorks.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: t('landing.howItWorks.step1Title'), desc: t('landing.howItWorks.step1Desc') },
              { step: '2', title: t('landing.howItWorks.step2Title'), desc: t('landing.howItWorks.step2Desc') },
              { step: '3', title: t('landing.howItWorks.step3Title'), desc: t('landing.howItWorks.step3Desc') },
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
          {t('landing.valueProps.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: t('landing.valueProps.noOverload'), desc: t('landing.valueProps.noOverloadDesc') },
            { title: t('landing.valueProps.adaptive'), desc: t('landing.valueProps.adaptiveDesc') },
            { title: t('landing.valueProps.science'), desc: t('landing.valueProps.scienceDesc') },
            { title: t('landing.valueProps.energy'), desc: t('landing.valueProps.energyDesc') },
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
          <h2 className="text-3xl font-bold mb-4">{t('landing.pricing.title')}</h2>
          <p className="text-gray-500 mb-12">
            {t('landing.pricing.sub')}
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="card text-left">
              <div className="text-sm font-medium text-gray-500 mb-2">{t('landing.pricing.freeTitle')}</div>
              <div className="text-3xl font-bold mb-4">
                {t('landing.pricing.freePrice')}<span className="text-base font-normal text-gray-400">{t('common.perMonth')}</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> {t('landing.pricing.freeDailyCard')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> {t('landing.pricing.freeCheckin')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">&#10003;</span> {t('landing.pricing.freeHistory')}
                </li>
              </ul>
              <Link href="signup" className="btn-secondary w-full block text-center">
                {t('landing.pricing.freeCta')}
              </Link>
            </div>
            <div className="card-elevated text-left border-2 border-volt-400 relative">
              <div className="absolute -top-3 left-4 bg-volt-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {t('landing.pricing.premiumPopular')}
              </div>
              <div className="text-sm font-medium text-volt-600 mb-2">{t('landing.pricing.premiumTitle')}</div>
              <div className="text-3xl font-bold mb-1">
                {t('landing.pricing.premiumPrice')}<span className="text-base font-normal text-gray-400">{t('common.perMonth')}</span>
              </div>
              <div className="text-sm text-gray-400 mb-4">{t('landing.pricing.premiumYearly')}</div>
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> {t('landing.pricing.premiumAll')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> {t('landing.pricing.premiumEngine')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> {t('landing.pricing.premiumReport')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> {t('landing.pricing.premiumSwitch')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-volt-500">&#10003;</span> {t('landing.pricing.premiumHistoryFull')}
                </li>
              </ul>
              <Link href="signup?plan=premium" className="btn-primary w-full block text-center">
                {t('landing.pricing.premiumCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-8 max-w-4xl mx-auto text-center">
        <p className="text-xs text-gray-400 leading-relaxed max-w-xl mx-auto">
          {t('landing.disclaimer')}
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-volt-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">V</span>
            </div>
            <span className="font-semibold">{t('common.appName')}</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="privacy">{t('landing.footer.privacy')}</Link>
            <Link href="terms">{t('landing.footer.terms')}</Link>
            <a href="mailto:support@voltsleep.nl">{t('landing.footer.contact')}</a>
          </div>
          <div className="text-xs text-gray-400">
            {t('landing.footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  )
}
