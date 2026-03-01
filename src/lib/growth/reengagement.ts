// ============================================================
// VOLT Sleep — Re-engagement Engine
// ============================================================
// Detects inactive users and prepares email triggers.
// No external email provider — returns trigger data for
// integration with Resend, Postmark, or Supabase Edge Functions.
// ============================================================

export interface ReengagementTrigger {
  userId: string
  email: string
  type: 'inactive_3d' | 'no_card_viewed' | 'streak_at_risk'
  subject: string
  preview: string
  locale: string
}

/**
 * Build re-engagement trigger for inactive user.
 */
export function buildReengagementTrigger(
  user: { id: string; email: string; locale?: string },
  type: ReengagementTrigger['type'],
  locale: string = 'en',
): ReengagementTrigger {
  const messages: Record<string, Record<ReengagementTrigger['type'], { subject: string; preview: string }>> = {
    en: {
      inactive_3d: {
        subject: 'Your energy plan is drifting',
        preview: 'It\'s been 3 days. Your Daily Energy Card is waiting — one action, 45 seconds.',
      },
      no_card_viewed: {
        subject: 'Your Daily Energy Card is ready',
        preview: 'Your personalized energy action for today is waiting. Don\'t break your momentum.',
      },
      streak_at_risk: {
        subject: 'Your energy streak is at risk',
        preview: 'You\'ve been consistent. Don\'t let your progress slip — check in today.',
      },
    },
    nl: {
      inactive_3d: {
        subject: 'Je energieplan drijft af',
        preview: 'Het is 3 dagen geleden. Je Daily Energy Card wacht — één actie, 45 seconden.',
      },
      no_card_viewed: {
        subject: 'Je Daily Energy Card staat klaar',
        preview: 'Je gepersonaliseerde energieactie voor vandaag wacht. Verlies je momentum niet.',
      },
      streak_at_risk: {
        subject: 'Je energiestreek loopt gevaar',
        preview: 'Je was consistent bezig. Laat je voortgang niet ontglippen — check vandaag in.',
      },
    },
    de: {
      inactive_3d: {
        subject: 'Dein Energieplan driftet ab',
        preview: 'Es sind 3 Tage vergangen. Deine Daily Energy Card wartet — eine Aktion, 45 Sekunden.',
      },
      no_card_viewed: {
        subject: 'Deine Daily Energy Card ist bereit',
        preview: 'Deine personalisierte Energieaktion für heute wartet. Verlier nicht dein Momentum.',
      },
      streak_at_risk: {
        subject: 'Deine Energieserie ist gefährdet',
        preview: 'Du warst konsequent dabei. Lass deinen Fortschritt nicht abreißen — check heute ein.',
      },
    },
    es: {
      inactive_3d: {
        subject: 'Tu plan de energía se está desviando',
        preview: 'Han pasado 3 días. Tu Daily Energy Card te espera — una acción, 45 segundos.',
      },
      no_card_viewed: {
        subject: 'Tu Daily Energy Card está lista',
        preview: 'Tu acción de energía personalizada para hoy te espera. No pierdas tu impulso.',
      },
      streak_at_risk: {
        subject: 'Tu racha de energía está en riesgo',
        preview: 'Has sido constante. No dejes que tu progreso se pierda — haz check-in hoy.',
      },
    },
    fr: {
      inactive_3d: {
        subject: 'Votre plan d\'énergie dérive',
        preview: 'Cela fait 3 jours. Votre Daily Energy Card vous attend — une action, 45 secondes.',
      },
      no_card_viewed: {
        subject: 'Votre Daily Energy Card est prête',
        preview: 'Votre action énergétique personnalisée pour aujourd\'hui vous attend. Ne perdez pas votre élan.',
      },
      streak_at_risk: {
        subject: 'Votre série d\'énergie est en danger',
        preview: 'Vous avez été régulier. Ne laissez pas vos progrès s\'envoler — faites le check-in aujourd\'hui.',
      },
    },
  }

  const msg = messages[locale]?.[type] || messages.en[type]
  return {
    userId: user.id,
    email: user.email,
    type,
    subject: msg.subject,
    preview: msg.preview,
    locale,
  }
}

/**
 * SQL query to find users needing re-engagement.
 * Run via Supabase Edge Function or cron job.
 */
export const REENGAGEMENT_QUERY = `
-- Users inactive for 3+ days (no daily_card_viewed event)
SELECT u.id, u.email, u.locale,
  MAX(ae.created_at) as last_active
FROM users u
LEFT JOIN analytics_events ae
  ON u.id = ae.user_id
  AND ae.event IN ('daily_card_viewed', 'checkin_completed_morning', 'checkin_completed_night')
WHERE u.onboarding_completed = true
GROUP BY u.id, u.email, u.locale
HAVING MAX(ae.created_at) < NOW() - INTERVAL '3 days'
   OR MAX(ae.created_at) IS NULL
ORDER BY last_active ASC
LIMIT 100;
`
