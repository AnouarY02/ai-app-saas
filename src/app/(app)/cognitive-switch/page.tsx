'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

const REFRAMES = [
  {
    thought: '"Ik moet NU slapen anders is morgen verpest."',
    reframe: 'Rust is ook waardevol. Zelfs als je niet slaapt, herstelt je lichaam terwijl je ontspannen ligt.',
    action: 'Lig ontspannen, adem rustig. Geen druk om te slapen.',
  },
  {
    thought: '"Ik heb vannacht maar X uur geslapen."',
    reframe: 'Eén slechte nacht maakt je niet kapot. Je lichaam compenseert vanavond automatisch.',
    action: 'Ga je dag in zoals gepland. Vermijd compensatiegedrag (extra koffie, dutjes).',
  },
  {
    thought: '"Ik kan nooit goed slapen."',
    reframe: '"Nooit" klopt niet — je hebt wél nachten gehad die beter waren. Focus op wat je kunt beïnvloeden.',
    action: 'Schrijf 1 ding op dat je morgen anders gaat doen. Klein beginnen.',
  },
  {
    thought: '"Als ik niet slaap, word ik ziek."',
    reframe: 'Je lichaam is veerkrachtiger dan je denkt. Slaap-angst is vaak erger dan het slaaptekort zelf.',
    action: 'Ontspan je kaak, schouders, handen. Focus op ademhaling: 4 sec in, 7 sec vast, 8 sec uit.',
  },
]

const STEPS = [
  'thought',    // Identify the thought
  'reframe',    // Cognitive reframe
  'breathe',    // Breathing exercise
  'action',     // Concrete action
] as const

export default function CognitiveSwitchPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedThought, setSelectedThought] = useState<number | null>(null)
  const [breathCount, setBreathCount] = useState(0)
  const [breathing, setBreathing] = useState(false)

  function startBreathing() {
    setBreathing(true)
    trackEvent('cognitive_switch_used')
    let count = 0
    const interval = setInterval(() => {
      count++
      setBreathCount(count)
      if (count >= 4) {
        clearInterval(interval)
        setBreathing(false)
      }
    }, 5000) // 5 sec per breath cycle
  }

  const reframe = selectedThought !== null ? REFRAMES[selectedThought] : null

  return (
    <div className="min-h-screen bg-night-950 text-white">
      <header className="px-6 py-4 flex items-center justify-between max-w-lg mx-auto">
        <Link href="/dashboard" className="text-night-300 hover:text-white">
          &larr; Terug
        </Link>
        <span className="text-night-400 text-sm">Cognitive Switch</span>
        <div className="w-6" />
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Step 0: Identify thought */}
        {step === 0 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Wat houdt je wakker?</h1>
              <p className="text-night-300">Kies de gedachte die het dichtst bij je gevoel ligt.</p>
            </div>
            <div className="space-y-3">
              {REFRAMES.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedThought(i)}
                  className={`w-full text-left p-4 rounded-xl transition-all
                    ${selectedThought === i
                      ? 'bg-night-700 border-2 border-night-400'
                      : 'bg-night-900 border-2 border-transparent hover:border-night-700'}`}
                >
                  <span className="text-sm">{r.thought}</span>
                </button>
              ))}
            </div>
            {selectedThought !== null && (
              <Button
                onClick={() => setStep(1)}
                className="w-full bg-night-600 hover:bg-night-500"
              >
                Volgende
              </Button>
            )}
          </div>
        )}

        {/* Step 1: Reframe */}
        {step === 1 && reframe && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Herformulering</h1>
            </div>
            <div className="bg-night-900 rounded-xl p-6">
              <div className="text-sm text-night-400 mb-2">Je gedachte:</div>
              <div className="text-night-300 line-through mb-4">{reframe.thought}</div>
              <div className="text-sm text-night-400 mb-2">Reframe:</div>
              <div className="text-white font-medium leading-relaxed">{reframe.reframe}</div>
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-night-600 hover:bg-night-500"
            >
              Ademhaling starten
            </Button>
          </div>
        )}

        {/* Step 2: Breathing */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in text-center">
            <h1 className="text-2xl font-bold">4-7-8 Ademhaling</h1>
            <p className="text-night-300">4 cycli. Rustig aan.</p>

            <div className="py-12">
              <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center
                border-4 border-night-400 transition-all duration-[5000ms]
                ${breathing ? 'scale-125 border-night-300' : 'scale-100'}`}
              >
                <span className="text-3xl font-bold">{breathCount}/4</span>
              </div>
              <div className="text-night-400 mt-4 text-sm">
                {breathing ? 'Adem in... houd vast... adem uit...' : breathCount >= 4 ? 'Klaar!' : ''}
              </div>
            </div>

            {breathCount < 4 && !breathing && (
              <Button
                onClick={startBreathing}
                className="bg-night-600 hover:bg-night-500"
              >
                {breathCount === 0 ? 'Start' : 'Doorgaan'}
              </Button>
            )}
            {breathCount >= 4 && (
              <Button
                onClick={() => setStep(3)}
                className="w-full bg-night-600 hover:bg-night-500"
              >
                Volgende
              </Button>
            )}
          </div>
        )}

        {/* Step 3: Action */}
        {step === 3 && reframe && (
          <div className="space-y-6 animate-in fade-in text-center">
            <h1 className="text-2xl font-bold">Je actie</h1>
            <div className="bg-night-900 rounded-xl p-6">
              <p className="text-white leading-relaxed">{reframe.action}</p>
            </div>

            <div className="bg-night-900/50 rounded-xl p-4 text-sm text-night-400">
              Herinner: rust is ook waardevol. Je hoeft niet perfect te slapen.
            </div>

            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-night-600 hover:bg-night-500"
            >
              Terug naar dashboard
            </Button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 text-xs text-night-500 text-center leading-relaxed">
          <p>
            Dit is geen therapie en vervangt geen professionele hulp.
            Bij ernstige slaapproblemen of mentale klachten: neem contact op met je huisarts.
          </p>
          <p className="mt-2">
            Hulplijn: 113 Zelfmoordpreventie (0900-0113) | Huisarts
          </p>
        </div>
      </div>
    </div>
  )
}
