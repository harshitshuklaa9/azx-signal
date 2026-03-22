'use client'

import type { Vertical } from '@/types'
import { VERTICALS, EXAMPLE_CHIPS } from '@/lib/constants'
import PulsingDot from '@/components/ui/PulsingDot'

interface ScreenHookProps {
  company: string
  vertical: Vertical
  onCompanyChange: (value: string) => void
  onVerticalChange: (value: Vertical) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function ScreenHook({
  company,
  vertical,
  onCompanyChange,
  onVerticalChange,
  onSubmit,
}: ScreenHookProps) {
  return (
    <section
      className="grid-bg relative"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(60px, 8vh, 100px) clamp(24px, 5vw, 40px)',
      }}
    >
      <div
        className="relative z-10 w-full"
        style={{ maxWidth: '720px', margin: '0 auto' }}
      >
        {/* Top label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '52px',
          }}
        >
          <PulsingDot />
          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              color: 'var(--muted)',
              letterSpacing: '0.2em',
            }}
          >
            AZX // TRANSFORMATION INTELLIGENCE
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-syne"
          style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 800,
            color: 'var(--white)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}
        >
          Critical industries run on
          <br />
          broken coordination.
          <br />
          <span style={{ color: 'var(--green)' }}>AI can fix that.</span>
        </h1>

        {/* Subtext */}
        <p
          className="font-syne"
          style={{
            fontSize: '16px',
            color: 'var(--muted)',
            lineHeight: 1.65,
            maxWidth: '480px',
            marginBottom: '32px',
          }}
        >
          Enter a company. See what AZX sees before walking in the room.
        </p>

        {/* Example chips */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          {EXAMPLE_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                onCompanyChange(chip.company)
                onVerticalChange(chip.vertical)
              }}
              className="font-mono"
              style={{
                fontSize: '12px',
                padding: '6px 14px',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--muted)',
                borderRadius: '3px',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'color 150ms, border-color 150ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--green)'
                e.currentTarget.style.borderColor = 'rgba(0,232,122,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Row: input + select */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <input
                type="text"
                value={company}
                onChange={(e) => onCompanyChange(e.target.value)}
                placeholder="Company name"
                required
                className="form-input"
                style={{
                  flex: 1,
                  height: '52px',
                  fontSize: '15px',
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <select
                value={vertical}
                onChange={(e) => onVerticalChange(e.target.value as Vertical)}
                className="form-input form-select"
                style={{
                  width: '180px',
                  height: '52px',
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                {VERTICALS.map((v) => (
                  <option
                    key={v}
                    value={v}
                    style={{ background: 'var(--surface)', color: 'var(--white)' }}
                  >
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit button — full width */}
            <button
              type="submit"
              disabled={!company.trim()}
              className="font-mono"
              style={{
                background: company.trim() ? 'var(--green)' : 'rgba(0,232,122,0.35)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: '4px',
                height: '52px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: company.trim() ? 'pointer' : 'not-allowed',
                letterSpacing: '0.08em',
                transition: 'opacity 150ms',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                if (company.trim()) e.currentTarget.style.opacity = '0.82'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              RUN ANALYSIS
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
