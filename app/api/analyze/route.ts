import OpenAI from 'openai'
import { scrapeCompanySignals } from '@/lib/scraper'

// Vercel: allow up to 60s for this function
export const maxDuration = 60

const openai = new OpenAI()

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(req: Request) {
  const { company, vertical } = await req.json()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      function send(event: Record<string, unknown>) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
        )
      }

      try {
        // ── Phase 1: stream scan lines while Firecrawl runs ──────────────
        send({ type: 'scan', line: '▸  INITIALIZING SIGNAL COLLECTION...' })
        await delay(400)

        send({ type: 'scan', line: '▸  READING LIVE NEWS SIGNALS...' })
        await delay(300)

        send({ type: 'scan', line: '▸  ANALYZING HIRING PATTERNS...' })
        await delay(300)

        send({ type: 'scan', line: '▸  SCANNING PRESS RELEASES...' })
        await delay(300)

        send({ type: 'scan', line: '▸  MAPPING COMPANY STRUCTURE...' })

        // ── Phase 2: Firecrawl parallel scrape ───────────────────────────
        const signals = await scrapeCompanySignals(company)

        send({ type: 'scan', line: '▸  SIGNALS COLLECTED — RUNNING ANALYSIS...' })
        send({ type: 'sources', data: signals.sourcesFound })
        await delay(200)

        send({
          type: 'scan',
          line: '▸  TRANSFORMATION WEDGE................. identified',
        })

        // ── Phase 3: build grounded context ──────────────────────────────
        const context = `
COMPANY: ${company}
VERTICAL: ${vertical}

RECENT NEWS SIGNALS:
${signals.news || 'Limited public data available'}

HIRING PATTERN SIGNALS:
${signals.jobs || 'Limited hiring data available'}

PRESS RELEASE SIGNALS:
${signals.pressReleases || 'Limited press data available'}

COMPANY OVERVIEW:
${signals.companyOverview || 'Limited overview available'}
`.trim()

        // ── Phase 4: stream OpenAI tokens ────────────────────────────────
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          stream: true,
          temperature: 0.7,
          max_tokens: 900,
          messages: [
            {
              role: 'system',
              content: `You are a senior operator who spent 20 years inside energy, utilities, real estate, and logistics companies before joining AZX. You have read thousands of earnings calls, sat in hundreds of board meetings, and know exactly how decisions die inside large enterprises. When you analyze a company you do not use:
- the word 'stifling'
- the word 'potential'
- the phrase 'lacks authority'
- the phrase 'decision-making'
- the word 'leverage'
- the phrase 'drive initiatives'
- any sentence that could apply to more than one company
You write like someone who has been inside this specific company. You name the exact team, the exact handoff, the exact moment where coordination breaks. You read between the lines of public signals and say what nobody inside the company will say out loud. Your opening question must make a senior executive uncomfortable because it is precise and true — not because it is provocative. It names something specific from the scraped data that the executive has not publicly addressed. If you catch yourself writing something generic, delete it and rewrite it until it could only apply to this company.`,
            },
            {
              role: 'user',
              content: `Based on this real intelligence about ${company} in the ${vertical} sector:

${context}

Generate a transformation intelligence brief.
Return ONLY valid JSON, no markdown, no explanation:
{
  "hidden_failure": "2-3 sentences. Based on what the scraped data reveals, identify the structural coordination failure. Name specific initiatives, systems, or dynamics visible in the data. Read between the lines of public signals like an insider.",
  "why_ai_stalls": "2-3 sentences. Based on hiring patterns and strategic announcements, explain why AI transformation will stall here in terms of incentive structure and decision authority — not culture. Name the specific misalignment visible in the data.",
  "coordination_gap": "2-3 sentences. Name the exact handoff point where information degrades in this company's operational cycle. Be concrete about what data exists, where it goes, and where it dies based on the signals.",
  "opening_question": "One sentence, maximum 15 words, ending with question mark. The single most uncomfortable structural question AZX could ask this company's leadership based on what the data revealed. Name a specific system, team, or initiative from the scraped data. Never start with How can you. Sound like someone who read their internal memos."
}`,
            },
          ],
        })

        // Stream each token to the client
        let accumulated = ''
        for await (const chunk of completion) {
          const token = chunk.choices[0]?.delta?.content ?? ''
          if (token) {
            accumulated += token
            send({ type: 'token', text: token })
          }
        }

        send({ type: 'done' })
      } catch (error) {
        console.error('Analyze stream error:', error)
        send({
          type: 'error',
          message: 'Signal analysis unavailable. Check API configuration.',
        })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
