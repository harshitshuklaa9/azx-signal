'use client'

import { useState, useRef, useCallback } from 'react'
import type { AppState, Vertical, AnalysisResult, Sources } from '@/types'
import { useAnalysis } from '@/hooks/useAnalysis'
import ScreenHook from '@/components/screens/ScreenHook'
import ScreenScan from '@/components/screens/ScreenScan'
import ScreenMap from '@/components/screens/ScreenMap'
import ScreenOpening from '@/components/screens/ScreenOpening'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('idle')
  const [company, setCompany] = useState('')
  const [vertical, setVertical] = useState<Vertical>('Energy')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scanLines, setScanLines] = useState<string[]>([])
  const [sources, setSources] = useState<Sources | null>(null)
  // streamedTokens accumulates the raw token stream for parsing; not rendered directly
  const [, setStreamedTokens] = useState('')

  const screen2Ref = useRef<HTMLDivElement>(null)
  const { analyze } = useAnalysis()

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!company.trim()) return

      // Reset all pipeline state before new run
      setResult(null)
      setError(null)
      setScanLines([])
      setSources(null)
      setStreamedTokens('')
      setAppState('scanning')

      // Scroll to scan screen as it mounts
      setTimeout(() => {
        screen2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)

      analyze(
        company.trim(),
        vertical,
        (line) => setScanLines((prev) => [...prev, line]),
        (src) => setSources(src),
        (token) => setStreamedTokens((prev) => prev + token),
        (res) => {
          setResult(res)
          setAppState('complete')
        },
        (err) => {
          setError(err)
          setAppState('complete')
        }
      )
    },
    [company, vertical, analyze]
  )

  const Divider = () => (
    <div
      style={{
        height: '1px',
        background: 'var(--border)',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    />
  )

  return (
    <main>
      <ScreenHook
        company={company}
        vertical={vertical}
        onCompanyChange={setCompany}
        onVerticalChange={setVertical}
        onSubmit={handleSubmit}
      />

      {appState !== 'idle' && (
        <>
          <Divider />
          <ScreenScan
            ref={screen2Ref}
            company={company}
            scanLines={scanLines}
            sources={sources}
            result={result}
            error={error}
          />
        </>
      )}

      {appState === 'complete' && (
        <>
          <Divider />
          <ScreenMap />
          {result && (
            <>
              <Divider />
              <ScreenOpening company={company} question={result.opening_question} />
            </>
          )}
        </>
      )}
    </main>
  )
}
