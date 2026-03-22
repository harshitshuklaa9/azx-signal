'use client'

import { motion } from 'framer-motion'

interface TransformNodeProps {
  label: string
  side: 'left' | 'right'
}

export default function TransformNode({ label, side }: TransformNodeProps) {
  const isLeft = side === 'left'

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: isLeft ? -12 : 12 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`font-mono ${isLeft ? '' : 'glow-pulse'}`}
      style={{
        fontSize: '13px',
        padding: '14px 20px',
        borderRadius: '6px',
        border: `1px solid ${isLeft ? 'rgba(255, 61, 90, 0.2)' : 'rgba(0, 232, 122, 0.27)'}`,
        background: isLeft ? 'transparent' : 'rgba(0, 232, 122, 0.04)',
        color: isLeft ? 'var(--muted)' : 'var(--white)',
        width: '100%',
        maxWidth: '260px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {label}
    </motion.div>
  )
}
