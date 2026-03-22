import FirecrawlApp from '@mendable/firecrawl-js'

export interface CompanySignals {
  news: string
  jobs: string
  pressReleases: string
  companyOverview: string
  sourcesFound: {
    newsCount: number
    jobsCount: number
    pressCount: number
    hasOverview: boolean
  }
}

export async function scrapeCompanySignals(
  company: string
): Promise<CompanySignals> {
  // Instantiate at call time, not module load — avoids build-time key validation
  const firecrawl = new FirecrawlApp({
    apiKey: process.env.FIRECRAWL_API_KEY!,
  })

  const results = await Promise.allSettled([
    // SOURCE 1: Recent news signals
    firecrawl.search(
      `${company} AI transformation operations 2025 2026`,
      { limit: 5 }
    ),

    // SOURCE 2: Job postings / hiring signals
    firecrawl.search(
      `${company} hiring jobs data engineering operations 2026`,
      { limit: 5 }
    ),

    // SOURCE 3: Press releases and strategic announcements
    firecrawl.search(
      `${company} press release announcement strategy 2025 2026`,
      { limit: 5 }
    ),

    // SOURCE 4: Company overview via search
    firecrawl.search(
      `${company} official website about operations`,
      { limit: 5 }
    ),
  ])

  // Debug: log raw shape of first result so we can verify live
  console.log(
    'Firecrawl news result:',
    JSON.stringify(results[0]).slice(0, 300)
  )

  // Extract content safely from each result.
  //
  // Actual runtime response shape (confirmed via live test):
  //   { web: [{ url, title, description, position }, ...] }
  //
  // The `web` key holds the results array. Items have top-level
  // `title` and `description` strings — no `markdown` in this mode.
  // Fallbacks handle `data` (new SDK shape) and `markdown` (scrape shape).
  function extractContent(result: PromiseSettledResult<unknown>): string {
    if (result.status === 'rejected') return ''
    const val = result.value as Record<string, unknown>
    if (!val) return ''

    // Primary: { web: [{ url, title, description, position }] }
    if (val.web && Array.isArray(val.web)) {
      return (val.web as Array<Record<string, unknown>>)
        .map((item) =>
          [item.title, item.description, item.url]
            .filter(Boolean)
            .join('\n')
        )
        .join('\n\n')
        .slice(0, 2000)
    }

    // Fallback A: new SDK shape { success, data: FirecrawlDocument[] }
    if (val.data && Array.isArray(val.data)) {
      return (val.data as Array<Record<string, unknown>>)
        .map((item) => {
          const meta = item.metadata as Record<string, unknown> | undefined
          const title = meta?.title ?? item.title
          const description = meta?.description ?? item.description
          return [title, description, item.markdown]
            .filter(Boolean)
            .join('\n')
        })
        .join('\n\n')
        .slice(0, 2000)
    }

    // Fallback B: direct scrape { markdown: '...' }
    if (typeof val.markdown === 'string') return val.markdown.slice(0, 2000)

    return ''
  }

  // Count actual results for the sources panel
  function countResults(result: PromiseSettledResult<unknown>): number {
    if (result.status === 'rejected') return 0
    const val = result.value as Record<string, unknown>
    if (!val) return 0
    if (val.web && Array.isArray(val.web)) return val.web.length
    if (val.data && Array.isArray(val.data)) return val.data.length
    return 0
  }

  const news = extractContent(results[0])
  const jobs = extractContent(results[1])
  const pressReleases = extractContent(results[2])
  const companyOverview = extractContent(results[3])

  return {
    news,
    jobs,
    pressReleases,
    companyOverview,
    sourcesFound: {
      newsCount: countResults(results[0]),
      jobsCount: countResults(results[1]),
      pressCount: countResults(results[2]),
      hasOverview: !!companyOverview,
    },
  }
}
