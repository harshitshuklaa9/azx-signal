'use client'

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AnalysisResult, Sources } from '@/types'
import { ANALYSIS_CARDS } from '@/lib/constants'
import AnalysisCard from '@/components/ui/AnalysisCard'

interface ScreenScanProps {
  company: string
  scanLines: string[]
  sources: Sources | null
  result: AnalysisResult | null
  error: string | null
}

const ScreenScan = forwardRef<HTMLDivElement, ScreenScanProps>(function ScreenScan(
  { company, scanLines, sources, result, error },
  ref
) {
  const showCards = result !== null
  const showError = error !== null

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(60px, 8vh, 100px) clamp(24px, 5vw, 40px)',
        paddingTop: '80px',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>

        {/* Section label */}
        <div
          className="font-mono"
          style={{
            fontSize: '11px',
            color: 'var(--muted)',
            letterSpacing: '0.2em',
            marginBottom: '48px',
          }}
        >
          // SIGNAL SCAN — {company.toUpperCase()}
        </div>

        {/* Dynamic scan lines — stream in naturally, no typewriter */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginBottom: '48px',
          }}
        >
          {scanLines.map((line, i) => (
            <div
              key={i}
              className="font-mono"
              style={{
                fontSize: '14px',
                lineHeight: 2,
                color: line.includes('identified')
                  ? 'var(--green)'
                  : 'var(--muted)',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Sources panel — appears after Firecrawl completes */}
        <AnimatePresence>
          {sources !== null && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--green)',
                padding: '20px 24px',
                marginBottom: '24px',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '10px',
                  color: 'var(--muted)',
                  letterSpacing: '0.2em',
                  marginBottom: '12px',
                }}
              >
                SIGNALS INGESTED
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                {[
                  `${sources.newsCount} news signals detected`,
                  `${sources.jobsCount} hiring signals detected`,
                  `${sources.pressCount} press release signals detected`,
                ].map((line) => (
                  <div
                    key={line}
                    className="font-mono"
                    style={{
                      fontSize: '12px',
                      color: 'var(--muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    • {line}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        {showError && (
          <div
            className="font-mono"
            style={{ fontSize: '14px', color: 'var(--red)', lineHeight: 2 }}
          >
            ▸&nbsp; SIGNAL ANALYSIS UNAVAILABLE........... check API key
          </div>
        )}

        {/* Analysis cards — only when result is populated */}
        {!showError && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ANALYSIS_CARDS.map((card, i) => (
              <AnalysisCard
                key={card.key}
                label={card.label}
                body={result ? result[card.key] : ''}
                accentColor={card.accentColor}
                delay={i * 0.4}
                show={showCards}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
})

export default ScreenScan
