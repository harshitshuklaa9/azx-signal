'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CURRENT_STATE_NODES, ENABLED_STATE_NODES } from '@/lib/constants'
import TransformNode from '@/components/ui/TransformNode'

const leftContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const rightContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 1.3 } },
}

function NodeColumn({
  nodes,
  side,
  label,
  labelColor,
}: {
  nodes: string[]
  side: 'left' | 'right'
  label: string
  labelColor: string
}) {
  const isLeft = side === 'left'

  return (
    <div style={{ flex: 1, maxWidth: '280px' }}>
      <div
        className="font-mono"
        style={{
          fontSize: '10px',
          color: labelColor,
          letterSpacing: '0.22em',
          marginBottom: '24px',
        }}
      >
        {label}
      </div>

      <motion.div
        variants={isLeft ? leftContainerVariants : rightContainerVariants}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {nodes.map((node, i) => (
          <div key={node}>
            <TransformNode label={node} side={side} />
            {i < nodes.length - 1 && (
              <div
                style={{
                  height: '20px',
                  width: '1px',
                  marginLeft: '24px',
                  borderLeft: isLeft
                    ? '1px dashed rgba(255, 61, 90, 0.3)'
                    : '1px solid rgba(0, 232, 122, 0.2)',
                }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ScreenMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px 0px' })

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(60px, 8vh, 100px) clamp(24px, 5vw, 40px)',
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
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          // THE TRANSFORMATION ARCHITECTURE
        </div>

        {/* Diagram */}
        <motion.div
          ref={ref}
          animate={inView ? 'visible' : 'hidden'}
          initial="hidden"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
          }}
          className="lg:flex-row lg:items-start lg:justify-center"
        >
          {/* Left column */}
          <NodeColumn
            nodes={CURRENT_STATE_NODES}
            side="left"
            label="CURRENT STATE"
            labelColor="rgba(255, 61, 90, 0.6)"
          />

          {/* Center connector */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              padding: '0 24px',
            }}
            className="lg:self-stretch"
          >
            {/* Desktop: vertical line */}
            <div
              className="hidden lg:flex"
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                minHeight: '220px',
              }}
            >
              <motion.div
                style={{ width: '1px', flex: 1, background: 'var(--border)', transformOrigin: 'top' }}
                variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ delay: 0.9, duration: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '12px 0',
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: '10px', color: 'var(--green)', letterSpacing: '0.2em' }}
                >
                  AZX
                </span>
                <span style={{ color: 'var(--green)', fontSize: '16px', lineHeight: 1 }}>→</span>
              </motion.div>
              <motion.div
                style={{ width: '1px', flex: 1, background: 'var(--border)', transformOrigin: 'bottom' }}
                variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>

            {/* Mobile: horizontal connector */}
            <div
              className="flex lg:hidden"
              style={{ flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <motion.div
                style={{ height: '1px', width: '48px', background: 'var(--border)', transformOrigin: 'left' }}
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ delay: 0.9 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: '10px', color: 'var(--green)', letterSpacing: '0.2em' }}
                >
                  AZX
                </span>
                <span style={{ color: 'var(--green)', fontSize: '16px' }}>↓</span>
              </motion.div>
              <motion.div
                style={{ height: '1px', width: '48px', background: 'var(--border)', transformOrigin: 'right' }}
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </div>
          </div>

          {/* Right column */}
          <NodeColumn
            nodes={ENABLED_STATE_NODES}
            side="right"
            label="AZX-ENABLED"
            labelColor="var(--green)"
          />
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="font-mono"
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            textAlign: 'center',
            marginTop: '60px',
            letterSpacing: '0.06em',
          }}
        >
          This is the architecture AZX installs.
        </motion.p>
      </div>
    </section>
  )
}
