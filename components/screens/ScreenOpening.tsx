'use client'

import { useState, useEffect } from 'react'

interface ScreenOpeningProps {
  company: string
  question: string
}

export default function ScreenOpening({ company, question }: ScreenOpeningProps) {
  const [displayed, setDisplayed] = useState('')
  const [showAttribution, setShowAttribution] = useState(false)
  const [showRule, setShowRule] = useState(false)
  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    if (!question) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(question.slice(0, i))
      if (i >= question.length) {
        clearInterval(interval)
        setTimeout(() => {
          setShowAttribution(true)
          setTimeout(() => {
            setShowRule(true)
            setTimeout(() => {
              setShowFooter(true)
            }, 500)
          }, 1000)
        }, 1000)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [question])

  const isTyping = displayed.length < question.length

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(60px, 8vh, 100px) clamp(24px, 5vw, 40px)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
        {/* Top label */}
        <div
          className="font-mono"
          style={{
            fontSize: '10px',
            color: 'var(--muted)',
            letterSpacing: '0.25em',
            marginBottom: '56px',
          }}
        >
          // THE QUESTION THAT OPENS THE ROOM
        </div>

        {/* Typewriter question */}
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p
            className="font-syne"
            style={{
              fontSize: 'clamp(18px, 2vw, 28px)',
              fontWeight: 800,
              color: 'var(--white)',
              lineHeight: 1.2,
              minHeight: '1.2em',
            }}
          >
            {displayed}
            {isTyping && (
              <span
                className="cursor-blink"
                style={{ color: 'var(--green)', fontWeight: 400, marginLeft: '2px' }}
              >
                ▌
              </span>
            )}
          </p>
        </div>

        {/* Attribution */}
        <p
          className="font-syne"
          style={{
            fontSize: '16px',
            color: 'var(--muted)',
            marginTop: '40px',
            lineHeight: 1.6,
            opacity: showAttribution ? 1 : 0,
            transition: 'opacity 800ms ease',
          }}
        >
          This is how AZX starts every engagement with {company}.
        </p>

        {/* Green rule */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'var(--green)',
            margin: '32px auto 0',
            opacity: showRule ? 1 : 0,
            transform: showRule ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'opacity 600ms ease, transform 600ms ease',
          }}
        />

        {/* Footer */}
        <p
          className="font-mono"
          style={{
            fontSize: '10px',
            color: 'rgba(74, 106, 122, 0.45)',
            letterSpacing: '0.06em',
            marginTop: '24px',
            opacity: showFooter ? 1 : 0,
            transition: 'opacity 800ms ease',
          }}
        >
          Built by Harshit Shukla · AZX GTM Engineer Application · harshit-shukla.vercel.app
        </p>
      </div>
    </section>
  )
}
