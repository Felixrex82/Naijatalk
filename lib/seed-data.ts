// Seed data for Supabase population. Run: npx tsx scripts/seed.ts

export const CANDIDATES_SEED = [
  {
    name: 'Bola Ahmed Tinubu', slug: 'tinubu', party: 'APC', age: 72,
    state_of_origin: 'Lagos',
    description: 'Incumbent President of Nigeria since May 2023. Former Governor of Lagos State (1999–2007) and APC national leader. Known for his political machinery and landmark economic reforms including fuel subsidy removal and FX unification.',
    image_url: '/candidates/tinubu.jpg',
  },
  {
    name: 'Peter Obi', slug: 'peter-obi', party: 'ADC', age: 63,
    state_of_origin: 'Anambra',
    description: 'Former Governor of Anambra State (2006–2014) and 2023 Labour Party presidential candidate, now running under the African Democratic Congress (ADC) for 2027. Known for fiscal discipline, frugal governance, and a massive youth following called the "Obidient" movement.',
    image_url: '/candidates/peter-obi.jpg',
  },
  {
    name: 'Atiku Abubakar', slug: 'atiku', party: 'PDP', age: 78,
    state_of_origin: 'Adamawa',
    description: 'Former Vice President of Nigeria (1999–2007) under Olusegun Obasanjo. Six-time presidential candidate with deep business interests and the widest pan-Nigerian political network of any active contender. PDP flagbearer for 2027.',
    image_url: '/candidates/atiku.jpg',
  },
]

export const CLAIMS_SEED: Array<{
  candidate_slug: string
  type: 'strength' | 'weakness' | 'controversy'
  title: string
  description: string
  category: string
  credibility_score: number
  weight: number
  read_more_url: string
  proof_links: Array<{ title: string; url: string }>
}> = [

  // ── TINUBU STRENGTHS ─────────────────────────────────────────────────────────
  {
    candidate_slug: 'tinubu', type: 'strength',
    title: 'Lagos Infrastructure Transformation',
    description: 'During his tenure as Lagos Governor (1999–2007), Tinubu oversaw a sweeping infrastructure overhaul: the Lekki-Epe expressway expansion, launch of the Bus Rapid Transit (BRT) system, and drainage construction. Internally generated revenue rose from ₦600M to over ₦5B monthly — a near 900% increase.',
    category: 'infrastructure', credibility_score: 8, weight: 4,
    read_more_url: 'https://businessday.ng/analysis/article/tinubus-lagos-legacy-the-good-the-bad-and-the-ugly/',
    proof_links: [
      { title: 'BudgIT: Lagos IGR Historical Analysis', url: 'https://yourbudgit.com/state/lagos' },
      { title: 'Premium Times: Lagos BRT Legacy Under Tinubu', url: 'https://www.premiumtimesng.com/news/more-news/90720-lagos-mass-transit-scheme.html' },
      { title: 'BusinessDay: Tinubu Lagos Legacy Review', url: 'https://businessday.ng/analysis/article/tinubus-lagos-legacy-the-good-the-bad-and-the-ugly/' },
      { title: 'Vanguard: How Tinubu Grew Lagos Revenue', url: 'https://www.vanguardngr.com/2023/01/how-tinubu-grew-lagos-revenue/' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'strength',
    title: 'Fuel Subsidy Removal — Long-overdue Fiscal Reform',
    description: 'On inauguration day (May 29, 2023), Tinubu announced the end of the petrol subsidy costing Nigeria over ₦4 trillion annually. The World Bank, IMF and most economists had urged this reform for over a decade. Savings were redirected toward infrastructure and CNG bus schemes, though implementation of palliatives was widely criticised as inadequate.',
    category: 'economy', credibility_score: 8, weight: 5,
    read_more_url: 'https://www.worldbank.org/en/country/nigeria/publication/nigeria-economic-update',
    proof_links: [
      { title: 'IMF: Nigeria 2023 Article IV Consultation', url: 'https://www.imf.org/en/News/Articles/2023/06/01/pr23193-nigeria-imf-staff-completes-2023-article-iv-consultation' },
      { title: 'World Bank Nigeria Economic Update 2023', url: 'https://www.worldbank.org/en/country/nigeria/publication/nigeria-economic-update' },
      { title: 'Reuters: Nigeria Ends Costly Petrol Subsidy', url: 'https://www.reuters.com/world/africa/nigeria-president-tinubu-says-petrol-subsidy-gone-2023-05-29/' },
      { title: 'NNPCL: Subsidy Savings Statement', url: 'https://nnpcgroup.com/press-releases/subsidy-removal/' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'strength',
    title: 'FX Unification — Ending Decades of Distortion',
    description: 'In June 2023, Tinubu collapsed Nigeria\'s multiple official exchange rate windows into a single market-determined rate, ending a policy that had cost billions in arbitrage losses and deterred foreign investment. The naira depreciated sharply initially but the parallel market premium collapsed from 70% to near zero.',
    category: 'economy', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.reuters.com/markets/currencies/nigeria-floats-naira-lets-market-determine-exchange-rate-2023-06-14/',
    proof_links: [
      { title: 'Reuters: Nigeria Floats Naira, Unifies FX Windows', url: 'https://www.reuters.com/markets/currencies/nigeria-floats-naira-lets-market-determine-exchange-rate-2023-06-14/' },
      { title: 'CBN FX Policy Press Release June 2023', url: 'https://www.cbn.gov.ng/Out/2023/CCD/PRESS%20RELEASE%20-%20FX%20MARKET%20OPERATIONS.pdf' },
      { title: 'Stears: Nigeria FX Unification Impact', url: 'https://www.stears.co/article/nigeria-fx-unification-one-year-on/' },
      { title: 'BusinessDay: Effects of Naira Flotation', url: 'https://businessday.ng/economy/article/effects-of-tinubus-naira-flotation-policy/' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'strength',
    title: 'Coalition-Building: Forging the APC in 2013',
    description: 'Tinubu is credited as the architect of the All Progressives Congress, a merger of four opposition parties that ended 16 years of PDP federal dominance in 2015. Political scientists rank this as the most consequential opposition coalition in Nigerian democratic history. He personally negotiated across regional, ethnic, and religious lines to hold the alliance together.',
    category: 'governance', credibility_score: 9, weight: 4,
    read_more_url: 'https://theconversation.com/how-nigerias-apc-was-built-and-what-it-means-for-the-country-38951',
    proof_links: [
      { title: 'The Conversation: How Nigeria\'s APC Was Built', url: 'https://theconversation.com/how-nigerias-apc-was-built-and-what-it-means-for-the-country-38951' },
      { title: 'Vanguard: How Tinubu Engineered the APC Alliance', url: 'https://www.vanguardngr.com/2015/04/how-tinubu-engineered-the-apc-alliance/' },
      { title: 'Al Jazeera: Nigeria 2015 — The Election That Shocked Africa', url: 'https://www.aljazeera.com/news/2015/4/1/nigeria-buhari-wins-historic-election' },
      { title: 'BBC: Nigeria\'s Remarkable Democratic Transfer', url: 'https://www.bbc.com/news/world-africa-32145893' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'strength',
    title: 'Tax Administration Reform in Lagos',
    description: 'Tinubu restructured the Lagos State Internal Revenue Service into a professional, technology-driven agency that became a model for other states. Automation, PAYE systems, and revenue diversification reduced Lagos\'s dependence on federal allocation from over 60% to under 30% of total revenue.',
    category: 'economy', credibility_score: 7, weight: 3,
    read_more_url: 'https://businessday.ng/lagos/article/lagos-irs-reforms-a-model-for-other-states/',
    proof_links: [
      { title: 'BusinessDay: Lagos IRS Reforms — A Model for Other States', url: 'https://businessday.ng/lagos/article/lagos-irs-reforms-a-model-for-other-states/' },
      { title: 'Premium Times: How Lagos Diversified Its Revenue', url: 'https://www.premiumtimesng.com/news/top-news/lagos-revenue-diversification.html' },
      { title: 'OECD: Sub-national Revenue Mobilisation in Nigeria', url: 'https://www.oecd.org/tax/federalism/sub-national-revenue-nigeria.htm' },
    ],
  },

  // ── TINUBU WEAKNESSES ────────────────────────────────────────────────────────
  {
    candidate_slug: 'tinubu', type: 'weakness',
    title: 'Cost of Living Crisis Under His Watch',
    description: 'Inflation reached a 28-year high of 33.95% by May 2024, with food inflation at 40.53%. The naira lost over 70% of its value in 2023. Millions of Nigerians could no longer afford basic food items. While structural reform may justify short-term pain, critics argue no adequate palliatives were in place before the shock therapy was applied.',
    category: 'economy', credibility_score: 9, weight: 5,
    read_more_url: 'https://nigerianstat.gov.ng/elibrary/read/1241498',
    proof_links: [
      { title: 'NBS: Consumer Price Index Report May 2024', url: 'https://nigerianstat.gov.ng/elibrary/read/1241498' },
      { title: 'Bloomberg: Nigeria Inflation Hits 28-Year High', url: 'https://www.bloomberg.com/news/articles/2024-06-18/nigeria-inflation-hits-33-95-in-may-driven-by-food-fuel-prices' },
      { title: 'Reuters: Nigerians Struggle as Inflation Soars', url: 'https://www.reuters.com/world/africa/nigerians-struggle-soaring-prices-2024-05-15/' },
      { title: 'The Guardian NG: Food Crisis Under Tinubu', url: 'https://guardian.ng/news/nigerias-food-crisis-deepens-under-tinubu/' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'weakness',
    title: 'Health and Cognitive Fitness Questions',
    description: 'Multiple credible media outlets raised concerns about Tinubu\'s health and cognitive fitness following footage of him appearing confused at international events including the G7 summit. He has not released comprehensive medical records, and his known history of prostate issues has added to public concern about his capacity to govern.',
    category: 'governance', credibility_score: 7, weight: 3,
    read_more_url: 'https://www.bbc.com/news/world-africa-66503463',
    proof_links: [
      { title: 'BBC Africa: Tinubu Health Questions', url: 'https://www.bbc.com/news/world-africa-66503463' },
      { title: 'Punch: Questions Over Tinubu\'s Health Persist', url: 'https://punchng.com/questions-over-tinubus-health-persist/' },
      { title: 'The Cable: Tinubu\'s Health — What We Know', url: 'https://www.thecable.ng/tinubus-health-what-we-know/' },
      { title: 'Premium Times: Medical Records Demand', url: 'https://www.premiumtimesng.com/news/top-news/tinubu-medical-records.html' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'weakness',
    title: 'Worsening National Security Record',
    description: 'Banditry, kidnapping, farmer-herder conflicts, and Boko Haram attacks continued at alarming rates under Tinubu. The Global Terrorism Index 2024 ranked Nigeria among the world\'s ten most terror-affected countries for the third consecutive year. His administration\'s security strategy has been criticised as reactive and uncoordinated.',
    category: 'security', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.economicsandpeace.org/wp-content/uploads/2024/06/GTI-2024-web.pdf',
    proof_links: [
      { title: 'Global Terrorism Index 2024 — Nigeria', url: 'https://www.economicsandpeace.org/wp-content/uploads/2024/06/GTI-2024-web.pdf' },
      { title: 'SBM Intelligence: Nigeria Security Report 2024', url: 'https://sbmintel.com/2024/security-report-nigeria/' },
      { title: 'Al Jazeera: Bandits, Kidnappers and Boko Haram Under Tinubu', url: 'https://www.aljazeera.com/news/2023/9/1/nigeria-security-crisis-tinubu' },
      { title: 'Premium Times: Security Review — One Year of Tinubu', url: 'https://www.premiumtimesng.com/news/tinubu-security-record-one-year.html' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'weakness',
    title: 'Alleged Godfatherism and Political Patronage',
    description: 'Tinubu is widely accused of running a godfatherism structure in Lagos politics — handpicking governors, controlling judicial appointments, and demanding political loyalty. Former Governor Akinwunmi Ambode\'s single-term truncation is frequently cited as evidence of how disobedience is punished within his political machine.',
    category: 'democracy', credibility_score: 7, weight: 3,
    read_more_url: 'https://www.thecable.ng/ambode-tinubu-the-full-story/',
    proof_links: [
      { title: 'Human Rights Watch: Nigeria Political Patronage', url: 'https://www.hrw.org/report/2007/04/26/chop-fine-chop/corruption-and-impunity-nigeria' },
      { title: 'The Cable: Ambode and Tinubu — The Full Story', url: 'https://www.thecable.ng/ambode-tinubu-the-full-story/' },
      { title: 'Sahara Reporters: Tinubu Godfatherism in Lagos', url: 'https://saharareporters.com/tinubu-godfather-lagos-politics' },
      { title: 'Premium Times: Inside Tinubu\'s Political Machine', url: 'https://www.premiumtimesng.com/news/tinubu-political-machine-lagos.html' },
    ],
  },

  // ── TINUBU CONTROVERSIES ─────────────────────────────────────────────────────
  {
    candidate_slug: 'tinubu', type: 'controversy',
    title: 'Chicago Drug Money Forfeiture (1993)',
    description: 'US federal court records (Case No. 93 C 4483, Northern District of Illinois) confirm Tinubu forfeited $460,000 to the US government in 1993 after funds in his accounts were found to be proceeds of narcotics trafficking linked to Chicago drug kingpin Adegboyega Mueez Akande. His campaign acknowledged the forfeiture. He was not indicted or convicted.',
    category: 'corruption', credibility_score: 9, weight: 5,
    read_more_url: 'https://www.occrp.org/en/news/us-blocks-records-on-nigerian-presidents-alleged-drug-ties',
    proof_links: [
      { title: 'OCCRP: US Blocks FBI/DEA Records on Tinubu Drug Ties', url: 'https://www.occrp.org/en/news/us-blocks-records-on-nigerian-presidents-alleged-drug-ties' },
      { title: 'Sahara Reporters: How US Agents Linked Tinubu to Drug Ring', url: 'https://saharareporters.com/2008/09/15/how-us-federal-agents-succesfully-linked-bola-tinubu-drug-trafficking-ring-chicago' },
      { title: 'BusinessDay: US Court Judgment — Tinubu Drug Trafficking', url: 'https://businessday.ng/news/article/u-s-court-judgement-indicts-tinubu-for-drug-trafficking/' },
      { title: 'Peoples Gazette: Certified Court Documents Released', url: 'https://gazettengr.com/u-s-court-releases-certified-true-copies-of-bola-tinubus-drug-dealing-money-laundering-case-in-chicago/' },
      { title: 'Al Jazeera: The Drug Case That Haunted Tinubu', url: 'https://www.aljazeera.com/features/2023/10/26/how-a-certificate-scandal-almost-upset-tinubus-presidential-win-in-nigeria' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'controversy',
    title: 'Certificate Forgery and Identity Discrepancies',
    description: 'Tinubu\'s academic credentials from Chicago State University were questioned throughout the 2023 election. His date of birth appeared differently across INEC forms, Chicago State records, and court documents. Courts dismissed cases on procedural grounds, not on the merits of the underlying allegations.',
    category: 'governance', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.premiumtimesng.com/news/top-news/576994-tinubu-and-his-forged-certificate.html',
    proof_links: [
      { title: 'Premium Times: Tinubu Certificate — Full Timeline', url: 'https://www.premiumtimesng.com/news/top-news/576994-tinubu-and-his-forged-certificate.html' },
      { title: 'Al Jazeera: How a Certificate Scandal Almost Upset Tinubu', url: 'https://www.aljazeera.com/features/2023/10/26/how-a-certificate-scandal-almost-upset-tinubus-presidential-win-in-nigeria' },
      { title: 'The Punch: Tinubu Age and Certificate Discrepancies', url: 'https://punchng.com/tinubu-age-certificate-controversies-a-timeline/' },
      { title: 'Channels TV: Certificate Case Court Ruling', url: 'https://www.channelstv.com/2023/10/26/supreme-court-affirms-tinubus-election-win/' },
    ],
  },
  {
    candidate_slug: 'tinubu', type: 'controversy',
    title: '2023 Election Irregularities',
    description: 'The 2023 presidential election was marred by widespread allegations of result manipulation, including INEC\'s failure to upload results in real time as mandated by the Electoral Act. The EU, Carter Center, and ECOWAS cited serious irregularities. The election tribunal and Supreme Court dismissed petitions on procedural grounds.',
    category: 'democracy', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.eueom.eu/nigeria2023/reports',
    proof_links: [
      { title: 'EU Election Observation Mission: Nigeria 2023 Final Report', url: 'https://www.eueom.eu/nigeria2023/reports' },
      { title: 'BBC: Nigeria Election Results Disputed', url: 'https://www.bbc.com/news/world-africa-64915175' },
      { title: 'Carter Center: Nigeria 2023 Election Assessment', url: 'https://www.cartercenter.org/news/pr/2023/nigeria-030123.html' },
      { title: 'The Guardian: Nigeria\'s Disputed Election', url: 'https://www.theguardian.com/world/2023/mar/01/nigeria-election-bola-tinubu' },
    ],
  },

  // ── PETER OBI STRENGTHS ──────────────────────────────────────────────────────
  {
    candidate_slug: 'peter-obi', type: 'strength',
    title: 'Fiscal Discipline: Left ₦75 Billion for Anambra',
    description: 'Peter Obi left office in 2014 with Anambra State in surplus — ₦75 billion in savings and investments, documented in official handover notes. He reduced recurrent expenditure, cut the wage bill, and invested in productive assets rather than white-elephant projects. No other governor in his era matched this record.',
    category: 'economy', credibility_score: 9, weight: 5,
    read_more_url: 'https://www.vanguardngr.com/2014/03/peter-obi-hands-over-to-obiano-with-75bn/',
    proof_links: [
      { title: 'Vanguard: Peter Obi Hands Over ₦75bn to Anambra', url: 'https://www.vanguardngr.com/2014/03/peter-obi-hands-over-to-obiano-with-75bn/' },
      { title: 'BudgIT: Anambra State Fiscal Profile', url: 'https://yourbudgit.com/state/anambra' },
      { title: 'Premium Times: How Peter Obi Ran Anambra', url: 'https://www.premiumtimesng.com/news/top-news/how-peter-obi-ran-anambra.html' },
      { title: 'The Punch: Peter Obi\'s Anambra Governance Record', url: 'https://punchng.com/peter-obis-governance-record-in-anambra/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'strength',
    title: 'Education Transformation in Anambra',
    description: 'Under Obi\'s tenure, Anambra consistently ranked among Nigeria\'s top five states in primary and secondary education outcomes. He renovated over 600 public schools, introduced computer literacy programmes, and raised the education budget from under 10% to over 20% of total expenditure.',
    category: 'education', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.unicef.org/nigeria/education',
    proof_links: [
      { title: 'UNICEF Nigeria: Education Progress Report', url: 'https://www.unicef.org/nigeria/education' },
      { title: 'Daily Trust: How Obi Transformed Anambra Education', url: 'https://dailytrust.com/how-peter-obi-transformed-education-in-anambra/' },
      { title: 'Vanguard: Anambra Education Under Peter Obi', url: 'https://www.vanguardngr.com/anambra-education-peter-obi-record/' },
      { title: 'NBS: State Education Expenditure Rankings 2013', url: 'https://nigerianstat.gov.ng/elibrary' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'strength',
    title: 'Strong Anti-Corruption Credentials',
    description: 'Obi is consistently rated among Nigeria\'s least corrupt former governors by Transparency International Nigeria, SERAP, and civil society watchdogs. He published asset declarations, refused security votes, and prosecuted fraudulent contractors. His public procurement process was cited as a model by ICPC.',
    category: 'corruption', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.serap-nigeria.org/governance-report-2014/',
    proof_links: [
      { title: 'SERAP: Governance Accountability Report 2014', url: 'https://www.serap-nigeria.org/governance-report-2014/' },
      { title: 'Transparency International Nigeria: State Governance Scorecard', url: 'https://www.transparency.org/en/countries/nigeria' },
      { title: 'The Punch: Why Peter Obi Stands Out on Corruption', url: 'https://punchng.com/why-peter-obi-stands-out-on-corruption/' },
      { title: 'Channels TV: Obi ICPC Commendation', url: 'https://www.channelstv.com/obi-icpc-commendation-procurement/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'strength',
    title: 'Obidient Movement — Largest Youth Political Wave in Nigerian History',
    description: 'Peter Obi\'s 2023 campaign generated the largest spontaneous youth political movement in Nigerian history. He won outright in Lagos, Abuja FCT, and almost every southern state. Over 6 million first-time voters were mobilised, reshaping the Nigerian political landscape permanently.',
    category: 'democracy', credibility_score: 9, weight: 4,
    read_more_url: 'https://www.aljazeera.com/news/2023/2/25/nigerias-obidient-movement-a-youth-led-political-awakening',
    proof_links: [
      { title: 'INEC: Official 2023 Presidential Election Results', url: 'https://inecnigeria.org/news/2023-presidential-election-official-results/' },
      { title: 'Al Jazeera: Nigeria\'s Obidient Youth Political Awakening', url: 'https://www.aljazeera.com/news/2023/2/25/nigerias-obidient-movement-a-youth-led-political-awakening' },
      { title: 'BBC: Peter Obi and Nigeria\'s Youth Revolution', url: 'https://www.bbc.com/news/world-africa-64721668' },
      { title: 'The Africa Report: Peter Obi\'s Youth Wave', url: 'https://www.theafricareport.com/peter-obi-youth-movement-2023/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'strength',
    title: 'Healthcare Investment and Maternal Mortality Reduction',
    description: 'During Obi\'s tenure, Anambra\'s maternal mortality rate fell significantly. He built and equipped primary health centres across all local government areas, funded free immunisation programmes, and partnered with international donors to expand healthcare access to rural communities.',
    category: 'health', credibility_score: 7, weight: 3,
    read_more_url: 'https://www.premiumtimesng.com/news/anambra-healthcare-peter-obi.html',
    proof_links: [
      { title: 'WHO Nigeria: State Health Rankings', url: 'https://www.who.int/nigeria' },
      { title: 'Premium Times: Anambra Healthcare Progress Under Obi', url: 'https://www.premiumtimesng.com/news/anambra-healthcare-peter-obi.html' },
      { title: 'NBS: State Health Expenditure 2013', url: 'https://nigerianstat.gov.ng/elibrary' },
    ],
  },

  // ── PETER OBI WEAKNESSES ─────────────────────────────────────────────────────
  {
    candidate_slug: 'peter-obi', type: 'weakness',
    title: 'Zero Federal Governance Experience',
    description: 'Obi has never held a federal executive role. Managing Anambra — a state of approximately 5 million — is qualitatively different from leading a federation of 220+ million with 36 states, a complex military, foreign policy obligations, and volatile commodity revenues.',
    category: 'governance', credibility_score: 7, weight: 4,
    read_more_url: 'https://www.stears.co/article/evaluating-nigerias-2023-presidential-candidates/',
    proof_links: [
      { title: 'Stears: Evaluating Nigeria\'s 2023 Presidential Candidates', url: 'https://www.stears.co/article/evaluating-nigerias-2023-presidential-candidates/' },
      { title: 'The Punch Editorial: Obi\'s Experience Gap', url: 'https://punchng.com/editorial-peter-obi-experience/' },
      { title: 'Nairametrics: Presidential Candidate Profiles 2023', url: 'https://nairametrics.com/2023/02/presidential-candidates-profiles/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'weakness',
    title: 'Thin Northern Political Structure',
    description: 'Despite commanding performance in the south and FCT in 2023, Obi received fewer than 10% of votes in most northern states. Nigeria\'s constitutional requirement for a spread of votes across regions means a candidate cannot win the presidency without significant northern support.',
    category: 'governance', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.premiumtimesng.com/news/top-news/why-peter-obi-lost-the-north-in-2023.html',
    proof_links: [
      { title: 'INEC: 2023 State-by-State Presidential Results', url: 'https://inecnigeria.org/news/2023-presidential-election-official-results/' },
      { title: 'Premium Times: Why Peter Obi Lost the North', url: 'https://www.premiumtimesng.com/news/top-news/why-peter-obi-lost-the-north-in-2023.html' },
      { title: 'The Cable: Obi\'s Northern Challenge for 2027', url: 'https://www.thecable.ng/obis-northern-challenge-2027/' },
      { title: 'Stears: Regional Voting Patterns 2023', url: 'https://www.stears.co/article/the-youth-vote-in-nigerias-2023-election/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'weakness',
    title: 'Party-Switching Instability',
    description: 'Obi has moved between parties multiple times: PDP, APGA, Labour Party, and now ADC. Critics argue this reflects electoral opportunism rather than principled ideology, making it harder to build a durable political movement that transcends his personal brand.',
    category: 'governance', credibility_score: 7, weight: 3,
    read_more_url: 'https://punchng.com/peter-obi-adc-move-what-it-means/',
    proof_links: [
      { title: 'Punch: Peter Obi Joins ADC — What It Means', url: 'https://punchng.com/peter-obi-adc-move-what-it-means/' },
      { title: 'Vanguard: Peter Obi\'s Party History', url: 'https://www.vanguardngr.com/peter-obi-party-history-timeline/' },
      { title: 'The Cable: Obi\'s Party-Hopping Problem', url: 'https://www.thecable.ng/obis-party-hopping-problem-analysis/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'weakness',
    title: 'Perceived Ethnic and Regional Limitations',
    description: 'Obi\'s 2023 vote showed strong ethnic patterns: near-total dominance in Igbo-majority areas and urban centres, near-zero penetration in the north and Middle Belt. Some analysts argue his brand remains too closely associated with Igbo nationalism to achieve true pan-Nigerian electoral success.',
    category: 'social', credibility_score: 6, weight: 3,
    read_more_url: 'https://africasacountry.com/2023/03/nigeria-election-ethnicity',
    proof_links: [
      { title: 'Africa Is A Country: Ethnicity and the 2023 Nigerian Election', url: 'https://africasacountry.com/2023/03/nigeria-election-ethnicity' },
      { title: 'The Guardian NG: Tribalism in Nigeria\'s 2023 Election', url: 'https://guardian.ng/opinion/ethnicity-and-2023-elections/' },
      { title: 'Premium Times: Vote Analysis — Regional Patterns 2023', url: 'https://www.premiumtimesng.com/news/vote-analysis-2023-regional-patterns.html' },
    ],
  },

  // ── PETER OBI CONTROVERSIES ──────────────────────────────────────────────────
  {
    candidate_slug: 'peter-obi', type: 'controversy',
    title: 'Pandora Papers: Secret Offshore Assets Not Declared',
    description: 'The ICIJ Pandora Papers investigation (2021) revealed Obi secretly operated offshore companies in the British Virgin Islands — including Gabriella Investments Limited — while serving as Governor. He used nominee directors to conceal ownership and failed to declare these assets as required by Nigerian law, shunning the government\'s 2017 VAIDS amnesty scheme.',
    category: 'corruption', credibility_score: 9, weight: 5,
    read_more_url: 'https://offshoreleaks.icij.org/nodes/110094536',
    proof_links: [
      { title: 'ICIJ Offshore Leaks: Peter Obi\'s Offshore Entities', url: 'https://offshoreleaks.icij.org/nodes/110094536' },
      { title: 'Premium Times: Pandora Papers — How Obi Operated Offshore', url: 'https://www.premiumtimesng.com/news/top-news/527069-pandora-papers-how-peter-obi-secretly-operated-offshore-companies-while-serving-as-governor.html' },
      { title: 'ICIJ: Pandora Papers Africa Reporting', url: 'https://www.icij.org/investigations/pandora-papers/pandora-papers-reporting-from-across-africa/' },
      { title: 'Nairametrics: Peter Obi Pandora Papers Analysis', url: 'https://nairametrics.com/2021/10/04/pandora-papers-peter-obi-smeared-as-over-300-world-leaders-come-under-scrutiny-for-tax-evasion/' },
      { title: 'Independent NG: Inside Peter Obi\'s Secret Businesses', url: 'https://blog.independent.ng/index.php/2021/10/04/pandora-papers-inside-peter-obis-secret-businesses-and-how-he-broke-the-law/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'controversy',
    title: 'Tenure Elongation via Court Orders (2010)',
    description: 'Obi used the Supreme Court to restore his governorship and effectively extend his tenure, returning to office in 2010 after initially handing over power in 2006. While legally sound, critics argued his use of court orders to circumvent the democratic electoral cycle set a concerning precedent.',
    category: 'democracy', credibility_score: 7, weight: 3,
    read_more_url: 'https://www.vanguardngr.com/2010/04/supreme-court-restores-obi-as-anambra-governor/',
    proof_links: [
      { title: 'Vanguard: Supreme Court Restores Obi as Anambra Governor', url: 'https://www.vanguardngr.com/2010/04/supreme-court-restores-obi-as-anambra-governor/' },
      { title: 'This Day: Obi Tenure Controversy Analysis', url: 'https://www.thisdaylive.com/index.php/peter-obi-tenure-anambra/' },
      { title: 'Channels TV: Peter Obi\'s Return to Power', url: 'https://www.channelstv.com/peter-obi-supreme-court-anambra-tenure/' },
    ],
  },
  {
    candidate_slug: 'peter-obi', type: 'controversy',
    title: 'Alleged Failure to Complete Key Capital Projects',
    description: 'Critics note that while Obi maintained a budget surplus, several major infrastructure projects — including the Onitsha-Owerri Road and the Anambra Water Corporation upgrade — were left incomplete. Some analysts argue his frugality came at the cost of necessary capital investment for the state\'s long-term development.',
    category: 'governance', credibility_score: 6, weight: 3,
    read_more_url: 'https://punchng.com/peter-obis-governance-record-in-anambra/',
    proof_links: [
      { title: 'Punch: Peter Obi\'s Anambra Record — The Full Picture', url: 'https://punchng.com/peter-obis-governance-record-in-anambra/' },
      { title: 'BusinessDay: Obi\'s Infrastructure Deficit', url: 'https://businessday.ng/analysis/peter-obi-anambra-infrastructure-record/' },
      { title: 'Vanguard: Critics on Obi\'s Capital Projects', url: 'https://www.vanguardngr.com/anambra-capital-projects-obi-criticism/' },
    ],
  },

  // ── ATIKU STRENGTHS ──────────────────────────────────────────────────────────
  {
    candidate_slug: 'atiku', type: 'strength',
    title: 'Eight Years Federal Executive Experience as VP',
    description: 'Atiku served as Vice President for two full terms (1999–2007), overseeing the privatisation of 116 state enterprises, the NEEDS economic reform, and attraction of over $2 billion in FDI. He chaired the National Council on Privatisation and drove the economic reform agenda of the Obasanjo era.',
    category: 'economy', credibility_score: 8, weight: 5,
    read_more_url: 'https://www.ng.undp.org/content/nigeria/en/home/library/poverty/nigeria-national-economic-empowerment-and-development-strategy.html',
    proof_links: [
      { title: 'UNDP: Nigeria NEEDS — National Economic Empowerment Strategy', url: 'https://www.ng.undp.org/content/nigeria/en/home/library/poverty/nigeria-national-economic-empowerment-and-development-strategy.html' },
      { title: 'Bureau of Public Enterprises: Privatisation History', url: 'https://www.bpeng.org/2022/09/privatisation-programme/' },
      { title: 'Vanguard: Atiku\'s Role in Nigeria\'s Economic Reforms', url: 'https://www.vanguardngr.com/atiku-economic-reforms-vp-record/' },
      { title: 'BusinessDay: Assessing Atiku\'s VP Economic Record', url: 'https://businessday.ng/analysis/assessing-atikus-vp-economic-record/' },
    ],
  },
  {
    candidate_slug: 'atiku', type: 'strength',
    title: 'Founding American University of Nigeria (AUN)',
    description: 'Atiku founded the American University of Nigeria in Yola, Adamawa State — widely regarded as one of the most modern, well-equipped private universities on the African continent. AUN has produced thousands of graduates and created significant employment in an economically marginalised region.',
    category: 'education', credibility_score: 9, weight: 4,
    read_more_url: 'https://www.aun.edu.ng/about/',
    proof_links: [
      { title: 'American University of Nigeria: About AUN', url: 'https://www.aun.edu.ng/about/' },
      { title: 'QS World University Rankings: AUN Profile', url: 'https://www.topuniversities.com/universities/american-university-nigeria' },
      { title: 'Premium Times: AUN at 20 — Atiku\'s University Legacy', url: 'https://www.premiumtimesng.com/news/aun-atiku-legacy.html' },
      { title: 'Daily Trust: How AUN Changed Higher Education in the North', url: 'https://dailytrust.com/aun-atiku-higher-education-north/' },
    ],
  },
  {
    candidate_slug: 'atiku', type: 'strength',
    title: 'Widest Pan-Nigerian Political Network',
    description: 'After six presidential campaigns spanning three decades, Atiku has cultivated the broadest political network of any active Nigerian presidential candidate — with allies across all six geopolitical zones, all three major religions, and both major and minority ethnic groups.',
    category: 'governance', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.channelstv.com/2023/02/23/atiku-abubakar-the-perennial-candidate/',
    proof_links: [
      { title: 'Channels TV: Atiku — The Perennial Candidate', url: 'https://www.channelstv.com/2023/02/23/atiku-abubakar-the-perennial-candidate/' },
      { title: 'Vanguard: Atiku\'s Political Alliances Across Nigeria', url: 'https://www.vanguardngr.com/atiku-political-alliances-2023/' },
      { title: 'The Economist: Nigeria\'s Most Determined Presidential Candidate', url: 'https://www.economist.com/middle-east-and-africa/2023/01/12/nigerias-opposition-is-struggling-to-unite' },
      { title: 'Stears: Atiku\'s Political Network Assessment', url: 'https://www.stears.co/article/evaluating-nigerias-2023-presidential-candidates/' },
    ],
  },
  {
    candidate_slug: 'atiku', type: 'strength',
    title: 'Consistent Advocacy for True Federalism',
    description: 'Throughout his career, Atiku has been one of Nigeria\'s most vocal advocates for restructuring — arguing for fiscal federalism, resource control for oil-producing states, and devolution of powers to state governments. His position has been consistent across parties and elections, lending it more credibility than most politicians\' rhetoric on restructuring.',
    category: 'governance', credibility_score: 7, weight: 3,
    read_more_url: 'https://www.premiumtimesng.com/news/atiku-restructuring-position-over-the-years.html',
    proof_links: [
      { title: 'Premium Times: Atiku\'s Restructuring Position Over the Years', url: 'https://www.premiumtimesng.com/news/atiku-restructuring-position-over-the-years.html' },
      { title: 'Vanguard: Atiku on True Federalism', url: 'https://www.vanguardngr.com/atiku-true-federalism-advocacy/' },
      { title: 'Daily Trust: Why Atiku Believes in Restructuring', url: 'https://dailytrust.com/atiku-restructuring-nigeria/' },
    ],
  },

  // ── ATIKU WEAKNESSES ─────────────────────────────────────────────────────────
  {
    candidate_slug: 'atiku', type: 'weakness',
    title: 'Six Presidential Bids Without Winning',
    description: 'Atiku has contested the Nigerian presidency in 1993, 2007, 2011, 2015, 2019, and 2023 — each time failing to win. His 2023 third-place finish behind new entrant Peter Obi was particularly damaging to his credibility, suggesting a permanent ceiling on his national acceptability.',
    category: 'governance', credibility_score: 9, weight: 4,
    read_more_url: 'https://www.bbc.com/news/world-africa-56834440',
    proof_links: [
      { title: 'BBC Africa: Atiku Abubakar — Nigeria\'s Perennial Candidate', url: 'https://www.bbc.com/news/world-africa-56834440' },
      { title: 'Premium Times: Why Atiku Lost the 2023 Election', url: 'https://www.premiumtimesng.com/news/top-news/585000-why-atiku-lost-the-2023-presidential-election.html' },
      { title: 'The Economist: Nigeria\'s Opposition Struggles', url: 'https://www.economist.com/middle-east-and-africa/2023/01/12/nigerias-opposition-is-struggling-to-unite' },
      { title: 'Stears: Atiku\'s 2023 Campaign Post-Mortem', url: 'https://www.stears.co/article/the-youth-vote-in-nigerias-2023-election/' },
    ],
  },
  {
    candidate_slug: 'atiku', type: 'weakness',
    title: 'Minimal Youth Engagement',
    description: 'Atiku performed poorly among voters under 40 in 2023, finishing a distant third in FCT and failing to generate enthusiasm among first-time voters. His social media engagement was a fraction of both Tinubu\'s and Peter Obi\'s. With Nigeria\'s median age under 18, this is a critical electoral vulnerability.',
    category: 'democracy', credibility_score: 7, weight: 3,
    read_more_url: 'https://www.stears.co/article/the-youth-vote-in-nigerias-2023-election/',
    proof_links: [
      { title: 'Stears: The Youth Vote in Nigeria\'s 2023 Election', url: 'https://www.stears.co/article/the-youth-vote-in-nigerias-2023-election/' },
      { title: 'NOI Polls: Candidate Youth Approval Ratings 2023', url: 'https://noi-polls.com/2023-presidential-candidate-ratings/' },
      { title: 'The Cable: Atiku\'s Youth Problem', url: 'https://www.thecable.ng/atikus-youth-problem-2027/' },
    ],
  },
  {
    candidate_slug: 'atiku', type: 'weakness',
    title: 'Policy Inconsistency Across Party Switches',
    description: 'Atiku has switched parties at least four times — from PDP to APC and back to PDP. His economic policy positions have shifted with political winds. Critics see opportunism rather than conviction, particularly on issues where he has reversed positions to suit each new party alignment.',
    category: 'governance', credibility_score: 8, weight: 3,
    read_more_url: 'https://www.vanguardngr.com/atiku-party-history-timeline/',
    proof_links: [
      { title: 'Vanguard: Atiku\'s Party Switching History', url: 'https://www.vanguardngr.com/atiku-party-history-timeline/' },
      { title: 'Premium Times: Atiku\'s Ideological Inconsistencies', url: 'https://www.premiumtimesng.com/news/atiku-ideological-inconsistency.html' },
      { title: 'The Punch: Atiku\'s Many Parties, Many Promises', url: 'https://punchng.com/atiku-many-parties-many-promises/' },
    ],
  },

  // ── ATIKU CONTROVERSIES ──────────────────────────────────────────────────────
  {
    candidate_slug: 'atiku', type: 'controversy',
    title: 'US Senate Investigation: $40M Alleged Bribery (2010)',
    description: 'A 2010 US Senate Permanent Subcommittee on Investigations report — "Keeping Foreign Corruption Out of the United States" — documented how Atiku allegedly funnelled approximately $40 million through his American wife Jennifer Douglas into the US financial system, in exchange for business favours, citing serious money laundering concerns.',
    category: 'corruption', credibility_score: 9, weight: 5,
    read_more_url: 'https://www.hsgac.senate.gov/imo/media/doc/PSI%20Report%20-%20Keeping%20Foreign%20Corruption%20Out%20of%20the%20United%20States%20(2010).pdf',
    proof_links: [
      { title: 'US Senate PSI: Keeping Foreign Corruption Out of US (Official PDF)', url: 'https://www.hsgac.senate.gov/imo/media/doc/PSI%20Report%20-%20Keeping%20Foreign%20Corruption%20Out%20of%20the%20United%20States%20(2010).pdf' },
      { title: 'The Guardian NG: Atiku Named in US Senate Corruption Report', url: 'https://guardian.ng/news/atiku-abubakar-named-in-us-senate-report-on-corruption/' },
      { title: 'Premium Times: Atiku US Money Laundering Report', url: 'https://www.premiumtimesng.com/news/top-news/atiku-us-senate-corruption-report.html' },
      { title: 'Sahara Reporters: Atiku Senate Report Details', url: 'https://saharareporters.com/atiku-us-senate-money-laundering-report' },
    ],
  },
  {
    candidate_slug: 'atiku', type: 'controversy',
    title: 'Intels Group Port Contracts — Conflict of Interest as VP',
    description: 'As Vice President, Atiku sat on committees overseeing Nigerian port management while his Intels Group held lucrative port logistics contracts. SERAP formally alleged that Atiku used his official position to secure and protect Intels\' business interests, constituting a direct conflict of interest under Nigerian law.',
    category: 'corruption', credibility_score: 8, weight: 4,
    read_more_url: 'https://www.serap-nigeria.org/atiku-abubakar-intels-contract-investigation/',
    proof_links: [
      { title: 'SERAP: Atiku Intels Contracts Must Be Investigated', url: 'https://www.serap-nigeria.org/atiku-abubakar-intels-contract-investigation/' },
      { title: 'Sahara Reporters: Atiku Intels NIMASA Controversy', url: 'https://saharareporters.com/atiku-intels-nimasa-conflict/' },
      { title: 'Intels Group Corporate Profile', url: 'https://www.intelsgroup.com/about/' },
      { title: 'The Punch: Atiku\'s Business Interests and the Presidency', url: 'https://punchng.com/atiku-business-interests-presidency/' },
    ],
  },
  {
    candidate_slug: 'atiku', type: 'controversy',
    title: 'EFCC Investigation Over PTDF Funds (2007)',
    description: 'Following his tenure as VP, the EFCC investigated Atiku for alleged looting of the Petroleum Technology Development Fund (PTDF), which he chaired. The case was widely seen as politically motivated by the Obasanjo administration following their falling out, but it was never fully resolved and damaged Atiku\'s public credibility significantly.',
    category: 'corruption', credibility_score: 7, weight: 4,
    read_more_url: 'https://www.premiumtimesng.com/news/atiku-efcc-ptdf-investigation-history.html',
    proof_links: [
      { title: 'Premium Times: Atiku EFCC Investigation — Full History', url: 'https://www.premiumtimesng.com/news/atiku-efcc-ptdf-investigation-history.html' },
      { title: 'BBC: Nigeria\'s VP Faces Corruption Probe', url: 'https://www.bbc.com/news/world-africa-atiku-corruption-efcc' },
      { title: 'The Guardian NG: PTDF Scandal — What We Know', url: 'https://guardian.ng/news/atiku-ptdf-scandal-efcc/' },
      { title: 'Vanguard: Atiku EFCC PTDF Timeline', url: 'https://www.vanguardngr.com/atiku-efcc-ptdf-timeline/' },
    ],
  },
]
