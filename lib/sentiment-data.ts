/**
 * Simulated social media posts for MVP.
 * Structure allows real Twitter/X API to be plugged in later.
 * Each post is tagged with likely sentiment ground truth for seeding.
 */

export interface SimulatedPost {
  text: string
  candidateSlug: string
  likelySentiment: 'positive' | 'negative' | 'neutral'
}

export const SIMULATED_POSTS: SimulatedPost[] = [
  // ── TINUBU ──────────────────────────────────────────────────────────────────
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'positive',
    text: `The fuel subsidy removal was painful but necessary. Tinubu had the courage to do what others refused. Economy needs this tough love.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'positive',
    text: `Lagos under Tinubu was transformed. The BRT system, IGR growth — that man built something real. Give him time to do it for Nigeria.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'positive',
    text: `FX unification was long overdue. Parallel market is dead. Investors are returning. Tinubu made the right call.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'positive',
    text: `APC built a formidable coalition in 2015 and ended 16 years of PDP dominance. Tinubu masterminded that. Credit where it is due.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'neutral',
    text: `Tinubu's economic reforms are controversial but the direction seems right. Execution is the real question for 2027.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'neutral',
    text: `The naira has stabilised somewhat but inflation is still killing ordinary Nigerians. Too early to judge.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'neutral',
    text: `Tinubu has strong political networks across all six zones. That matters for governing Nigeria's complexity.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `Garri that used to be ₦500 is now ₦3500. Tinubu said subsidy is gone but what did we gain? Our suffering increased.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `The $460,000 drug money forfeiture in 1993 is a disqualifier for me. A president with that history cannot lecture us on corruption.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `Certificate forgery, drug money, health concerns — how did Nigeria end up with Tinubu as president? We deserve better.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `Bandits are still kidnapping students, farmers can't go to their land, and Tinubu is travelling abroad every week. Leadership failure.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `Godfatherism in Lagos destroyed independent governance. Tinubu controls everything — that's not democracy, that's a fiefdom.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'positive',
    text: `CNG bus rollout is happening. Infrastructure is visible. This government is working, give it time.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `Food inflation at 40%? My salary is still the same. Tinubu's reforms are only helping the rich.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'neutral',
    text: `Whether Tinubu runs in 2027 depends on whether Nigerians feel better in their pockets by 2026. That's the real referendum.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `The 2023 election results were never properly uploaded. INEC failed us and the courts covered it up. Tinubu's legitimacy is questionable.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'positive',
    text: `Tax reforms coming. Business environment improving. We should give Tinubu's economic team a chance to deliver.`,
  },
  {
    candidateSlug: 'tinubu',
    likelySentiment: 'negative',
    text: `Our president cannot complete a full sentence in public anymore. Nigeria is being run by a sick man. This is shameful.`,
  },

  // ── PETER OBI ────────────────────────────────────────────────────────────────
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `Peter Obi left ₦75 billion in Anambra's account. Name one other Nigerian governor who did that. He is the standard.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `The Obidient movement was historic. 6 million first-time voters mobilised. Peter Obi proved Nigerians want change.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `Peter Obi renovated 600+ schools in Anambra. That's what governance looks like. Not flag-offs, actual delivery.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `No Nigerian politician has cleaner hands than Peter Obi. SERAP, TI, every watchdog confirms it. That's rare.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `Obi in ADC is a bold move. He doesn't need a legacy party. He IS the movement. 2027 will be different.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'neutral',
    text: `Peter Obi is brilliant at state governance but running Nigeria requires federal machinery he doesn't yet have.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'neutral',
    text: `The Pandora Papers allegation is concerning but the context matters — he says it was for legitimate asset management.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'neutral',
    text: `Obi switching to ADC again shows he prioritises electability over loyalty. Not necessarily wrong but worth noting.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'negative',
    text: `Pandora Papers exposed Peter Obi hiding assets in BVI while governor. He didn't even use the government's VAIDS amnesty. Hypocrite.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'negative',
    text: `He won Lagos and FCT but got barely 10% in any northern state. Nigeria is not just the south. Obi cannot win.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'negative',
    text: `Peter Obi has been in PDP, APGA, Labour Party, now ADC. What does he actually believe in? He follows opportunity.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'negative',
    text: `Running a state of 5 million people is NOT the same as running Africa's most populous nation. Obi is simply not ready.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `Peter Obi is the only candidate who refused security votes and published his declarations. That integrity matters.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `Nigeria's youth found a political voice through Obi. That movement doesn't die even if he loses. It's bigger than him now.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'negative',
    text: `The Obidient movement was ethnic politics dressed in youthful clothing. Almost entirely Igbo and southern. That's the reality.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `Anambra healthcare outcomes improved significantly under Obi. Maternal mortality fell. He invested in the right places.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'neutral',
    text: `Peter Obi in 2027 will need to show a northern strategy. Without Kano, Kaduna and Borno, the numbers don't add up.`,
  },
  {
    candidateSlug: 'peter-obi',
    likelySentiment: 'positive',
    text: `Obi left Anambra debt-free. Every other state was borrowing to pay salaries. He is a different breed of politician.`,
  },

  // ── ATIKU ────────────────────────────────────────────────────────────────────
  {
    candidateSlug: 'atiku',
    likelySentiment: 'positive',
    text: `Atiku privatised 116 enterprises as VP and attracted billions in FDI. He has the federal executive experience Nigeria needs.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'positive',
    text: `The American University of Nigeria in Yola is one of Africa's best. Atiku built it from scratch. That's real vision.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'positive',
    text: `Atiku has political networks across all six geopolitical zones built over 30 years. Governing Nigeria requires exactly that.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'positive',
    text: `Nobody has advocated for true federalism and resource control more consistently than Atiku. He walks the talk.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'neutral',
    text: `Atiku knows how federal government works better than Obi or even Tinubu in some ways. Experience matters at this level.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'neutral',
    text: `The EFCC PTDF case against Atiku looked political at the time. But where there's smoke, one must ask about fire.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'neutral',
    text: `Six attempts is a lot. But so was Buhari at 3 attempts before winning. Persistence is not a disqualifier.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'negative',
    text: `Atiku has run for president SIX TIMES. Every time a new party, new promises. Nigeria is not his consolation prize.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'negative',
    text: `The US Senate report named Atiku in a $40 million money laundering scheme. That's not an allegation — it's a documented US government finding.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'negative',
    text: `Atiku used Intels Group to profit from port contracts while he was VP. Pure conflict of interest.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'negative',
    text: `The youth don't trust Atiku at all. He finished third behind Peter Obi in 2023.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'negative',
    text: `PDP, then APC, then back to PDP. Atiku is a politician without ideology.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'positive',
    text: `If Atiku runs well, he can win the north convincingly.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'negative',
    text: `Atiku at 78 wants to rule Nigeria. We need young, energetic leadership.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'neutral',
    text: `Atiku's business empire is enormous. That's both an asset and a liability.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'positive',
    text: `Atiku's restructuring position has been consistent for 20+ years.`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'negative',
    text: `The man who couldn't win in multiple elections — what makes anyone think 2027 will be different?`,
  },
  {
    candidateSlug: 'atiku',
    likelySentiment: 'positive',
    text: `Atiku built AUN and created thousands of jobs in Adamawa.`,
  },
]