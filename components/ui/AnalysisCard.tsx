'use client'

import { motion } from 'framer-motion'

interface AnalysisCardProps {
  label: string
  body: string
  accentColor: string
  delay: number
  show: boolean
}

export default function AnalysisCard({
  label,
  body,
  accentColor,
  delay,
  show,
}: AnalysisCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${accentColor}`,
        padding: '24px 28px',
        borderRadius: '4px',
      }}
    >
      <div
        className="font-mono mb-3"
        style={{
          fontSize: '10px',
          color: 'var(--muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: '14px',
          lineHeight: '1.9',
          color: 'var(--white)',
        }}
      >
        {body}
      </p>
    </motion.div>
  )
}
