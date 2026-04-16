import { QuizQuestion } from '@/types'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'What is the most urgent economic priority for Nigeria right now?',
    options: [
      {
        id: 'q1a',
        text: 'Removing distortions — subsidies, FX controls — and letting markets work',
        weights: { tinubu: 3, 'peter-obi': 1, atiku: 2 },
      },
      {
        id: 'q1b',
        text: 'Investing public money in education and productivity to grow the real economy',
        weights: { tinubu: 1, 'peter-obi': 3, atiku: 1 },
      },
      {
        id: 'q1c',
        text: 'Privatising state assets and attracting large foreign direct investment',
        weights: { tinubu: 2, 'peter-obi': 1, atiku: 3 },
      },
      {
        id: 'q1d',
        text: 'Regulating prices and protecting ordinary people from market shocks',
        weights: { tinubu: 0, 'peter-obi': 2, atiku: 1 },
      },
    ],
  },
  {
    id: 'q2',
    text: 'How should Nigeria handle its security crisis in the north?',
    options: [
      {
        id: 'q2a',
        text: 'Deploy overwhelming military force to crush insurgency decisively',
        weights: { tinubu: 2, 'peter-obi': 1, atiku: 2 },
      },
      {
        id: 'q2b',
        text: 'Address root causes — poverty, unemployment, community development',
        weights: { tinubu: 1, 'peter-obi': 3, atiku: 2 },
      },
      {
        id: 'q2c',
        text: 'Create state police and give governors more control over security',
        weights: { tinubu: 3, 'peter-obi': 2, atiku: 1 },
      },
      {
        id: 'q2d',
        text: 'Engage international partners — US, UN — for joint counter-terrorism',
        weights: { tinubu: 1, 'peter-obi': 1, atiku: 3 },
      },
    ],
  },
  {
    id: 'q3',
    text: 'What kind of leadership style do you think Nigeria needs most?',
    options: [
      {
        id: 'q3a',
        text: 'A bold, decisive coalition-builder who can navigate Nigeria\'s complex politics',
        weights: { tinubu: 4, 'peter-obi': 1, atiku: 2 },
      },
      {
        id: 'q3b',
        text: 'A frugal technocrat who leads by example and prioritises results over politics',
        weights: { tinubu: 1, 'peter-obi': 4, atiku: 0 },
      },
      {
        id: 'q3c',
        text: 'An experienced statesman with deep knowledge of federal bureaucracy',
        weights: { tinubu: 2, 'peter-obi': 0, atiku: 4 },
      },
    ],
  },
  {
    id: 'q4',
    text: 'How important is anti-corruption as a standalone presidential priority?',
    options: [
      {
        id: 'q4a',
        text: 'Extremely — it should be the number one focus above all else',
        weights: { tinubu: 0, 'peter-obi': 4, atiku: 1 },
      },
      {
        id: 'q4b',
        text: 'Important, but economic growth must come first — a growing economy reduces corruption',
        weights: { tinubu: 3, 'peter-obi': 1, atiku: 2 },
      },
      {
        id: 'q4c',
        text: 'Somewhat — but reforming institutions matters more than prosecuting individuals',
        weights: { tinubu: 2, 'peter-obi': 2, atiku: 3 },
      },
    ],
  },
  {
    id: 'q5',
    text: 'Nigeria should prioritise which of the following in foreign policy?',
    options: [
      {
        id: 'q5a',
        text: 'Stronger African unity — ECOWAS, AU, African Development Bank',
        weights: { tinubu: 3, 'peter-obi': 2, atiku: 2 },
      },
      {
        id: 'q5b',
        text: 'Tighter trade and diplomatic ties with the United States and Europe',
        weights: { tinubu: 1, 'peter-obi': 2, atiku: 4 },
      },
      {
        id: 'q5c',
        text: 'Focus inward — fix domestic problems before engaging the world',
        weights: { tinubu: 1, 'peter-obi': 3, atiku: 0 },
      },
    ],
  },
  {
    id: 'q6',
    text: 'What is your view on the fuel subsidy removal?',
    options: [
      {
        id: 'q6a',
        text: 'It was necessary and overdue — the fiscal waste was unsustainable',
        weights: { tinubu: 4, 'peter-obi': 2, atiku: 2 },
      },
      {
        id: 'q6b',
        text: 'It was right in principle but badly executed without adequate palliatives',
        weights: { tinubu: 1, 'peter-obi': 3, atiku: 3 },
      },
      {
        id: 'q6c',
        text: 'It was wrong — it caused a cost-of-living crisis for ordinary Nigerians',
        weights: { tinubu: 0, 'peter-obi': 1, atiku: 2 },
      },
    ],
  },
  {
    id: 'q7',
    text: 'What role should state governments play vs. the federal government?',
    options: [
      {
        id: 'q7a',
        text: 'States need more power — true federalism with fiscal autonomy',
        weights: { tinubu: 4, 'peter-obi': 3, atiku: 2 },
      },
      {
        id: 'q7b',
        text: 'A balanced approach — strong federal coordination with state flexibility',
        weights: { tinubu: 2, 'peter-obi': 2, atiku: 3 },
      },
      {
        id: 'q7c',
        text: 'Nigeria needs stronger federal oversight to prevent state-level corruption',
        weights: { tinubu: 1, 'peter-obi': 2, atiku: 2 },
      },
    ],
  },
  {
    id: 'q8',
    text: 'Which of these candidate backgrounds do you find most reassuring?',
    options: [
      {
        id: 'q8a',
        text: 'A former governor who built one of Nigeria\'s most successful cities',
        weights: { tinubu: 5, 'peter-obi': 0, atiku: 0 },
      },
      {
        id: 'q8b',
        text: 'A governor known for frugality, savings, and education reform',
        weights: { tinubu: 0, 'peter-obi': 5, atiku: 0 },
      },
      {
        id: 'q8c',
        text: 'A former Vice President with 8 years of federal executive experience',
        weights: { tinubu: 0, 'peter-obi': 0, atiku: 5 },
      },
    ],
  },
  {
    id: 'q9',
    text: 'How do you feel about Nigeria\'s relationship with past controversies in leadership?',
    options: [
      {
        id: 'q9a',
        text: 'Past controversies can be forgiven if the candidate delivers results',
        weights: { tinubu: 3, 'peter-obi': 1, atiku: 3 },
      },
      {
        id: 'q9b',
        text: 'Integrity is non-negotiable — any credible corruption allegation disqualifies a candidate',
        weights: { tinubu: 0, 'peter-obi': 3, atiku: 0 },
      },
      {
        id: 'q9c',
        text: 'Context matters — I\'ll weigh the severity and evidence of each case individually',
        weights: { tinubu: 2, 'peter-obi': 2, atiku: 2 },
      },
    ],
  },
  {
    id: 'q10',
    text: 'What issue matters most to you personally for 2027?',
    options: [
      {
        id: 'q10a',
        text: 'Economy — cost of living, jobs, inflation',
        weights: { tinubu: 2, 'peter-obi': 3, atiku: 2 },
      },
      {
        id: 'q10b',
        text: 'Security — banditry, Boko Haram, kidnapping',
        weights: { tinubu: 2, 'peter-obi': 2, atiku: 3 },
      },
      {
        id: 'q10c',
        text: 'Democracy — electoral reform, rule of law, press freedom',
        weights: { tinubu: 1, 'peter-obi': 3, atiku: 2 },
      },
      {
        id: 'q10d',
        text: 'Infrastructure — roads, power, broadband',
        weights: { tinubu: 3, 'peter-obi': 2, atiku: 2 },
      },
    ],
  },
]

export function computeQuizResult(answers: Record<string, string>): Record<string, number> {
  const totals: Record<string, number> = { tinubu: 0, 'peter-obi': 0, atiku: 0 }
  const maxPossible: Record<string, number> = { tinubu: 0, 'peter-obi': 0, atiku: 0 }

  for (const question of QUIZ_QUESTIONS) {
    const selectedId = answers[question.id]
    const selectedOption = question.options.find((o) => o.id === selectedId)

    // Track max possible per candidate for normalization
    const maxOptionWeights: Record<string, number> = { tinubu: 0, 'peter-obi': 0, atiku: 0 }
    for (const option of question.options) {
      for (const [slug, weight] of Object.entries(option.weights)) {
        maxOptionWeights[slug] = Math.max(maxOptionWeights[slug] || 0, weight)
      }
    }
    for (const [slug, max] of Object.entries(maxOptionWeights)) {
      maxPossible[slug] = (maxPossible[slug] || 0) + max
    }

    if (selectedOption) {
      for (const [slug, weight] of Object.entries(selectedOption.weights)) {
        totals[slug] = (totals[slug] || 0) + weight
      }
    }
  }

  // Normalize to percentages
  const percentages: Record<string, number> = {}
  for (const slug of Object.keys(totals)) {
    percentages[slug] = Math.round((totals[slug] / maxPossible[slug]) * 100)
  }

  return percentages
}
