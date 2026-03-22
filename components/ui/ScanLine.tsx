'use client'

import { useState, useEffect, useRef } from 'react'

interface ScanLineProps {
  text: string
  delay: number
  color?: 'muted' | 'green'
  onComplete?: () => void
  /** If true, show a blinking "..." suffix after the line finishes */
  showFinalizing?: boolean
}

export default function ScanLine({
  text,
  delay,
  color = 'muted',
  onComplete,
  showFinalizing = false,
}: ScanLineProps) {
  const [visibleChars, setVisibleChars] = useState(0)
  const [done, setDone] = useState(false)
  const calledComplete = useRef(false)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const timer = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++
        setVisibleChars(i)
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          if (!calledComplete.current) {
            calledComplete.current = true
            onComplete?.()
          }
        }
      }, 18)
    }, delay)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const textColor = color === 'green' ? 'var(--green)' : 'var(--muted)'

  return (
    <div
      className="font-mono"
      style={{ color: textColor, fontSize: '14px', lineHeight: 2, minHeight: '28px' }}
    >
      <span>{text.slice(0, visibleChars)}</span>
      {!done && (
        <span className="cursor-blink" style={{ color: 'var(--green)' }}>
          ▌
        </span>
      )}
      {done && showFinalizing && (
        <span
          className="cursor-blink ml-2 text-xs"
          style={{ color: 'var(--muted)' }}
        >
          finalizing...
        </span>
      )}
    </div>
  )
}
