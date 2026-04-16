/**
 * RSS feed configuration.
 * All URLs are real, verified, publicly accessible feeds.
 * Toggle enabled:false to disable a source without removing it.
 */

export interface FeedConfig {
  name: string
  url:  string
  enabled: boolean
}

export const RSS_FEEDS: FeedConfig[] = [
  {
    name: 'BBC World',
    url:  'https://feeds.bbci.co.uk/news/world/rss.xml',
    enabled: true,
  },
  {
    name: 'Al Jazeera',
    url:  'https://www.aljazeera.com/xml/rss/all.xml',
    enabled: true,
  },
  {
    name: 'Reuters Africa',
    url:  'https://www.reutersagency.com/feed/?best-topics=africa',
    enabled: true,
  },
  {
    name: 'Premium Times',
    url:  'https://www.premiumtimesng.com/feed',
    enabled: true,
  },
  {
    name: 'Channels TV',
    url:  'https://www.channelstv.com/feed/',
    enabled: true,
  },
]

// Candidate matching — ALL checked case-insensitively against title + snippet
export const CANDIDATE_KEYWORDS: Record<string, string[]> = {
  tinubu: ['tinubu', 'bola ahmed tinubu', 'bola tinubu'],
  obi:    ['peter obi', 'peter gregory obi'],
  atiku:  ['atiku', 'atiku abubakar'],
}

// Flat list for the first-pass filter
export const ALL_CANDIDATE_KEYWORDS: string[] = Object.values(CANDIDATE_KEYWORDS).flat()
