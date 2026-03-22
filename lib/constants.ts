import type { ExampleChip, Vertical } from '@/types'

export const VERTICALS: Vertical[] = [
  'Energy',
  'Utilities',
  'Logistics',
  'Real Estate',
  'Cleantech',
  'Oil & Gas',
]

export const EXAMPLE_CHIPS: ExampleChip[] = [
  { label: 'Try: Dominion Energy', company: 'Dominion Energy', vertical: 'Energy' },
  { label: 'Try: CBRE', company: 'CBRE', vertical: 'Real Estate' },
]

export const SCAN_LINES = [
  {
    text: '▸  SECTOR MAPPING........................ done',
    color: 'muted' as const,
  },
  {
    text: '▸  REGULATORY ENVIRONMENT............... done',
    color: 'muted' as const,
  },
  {
    text: '▸  COORDINATION ANALYSIS................ done',
    color: 'muted' as const,
  },
  {
    text: '▸  TRANSFORMATION WEDGE................. identified',
    color: 'green' as const,
  },
]

export const ANALYSIS_CARDS = [
  {
    index: 1,
    label: '01 // HIDDEN FAILURE',
    title: 'THE HIDDEN FAILURE',
    key: 'hidden_failure' as const,
    accentColor: '#ff3d5a',
  },
  {
    index: 2,
    label: '02 // WHY AI STALLS',
    title: 'WHY AI STALLS HERE',
    key: 'why_ai_stalls' as const,
    accentColor: '#f5a623',
  },
  {
    index: 3,
    label: '03 // COORDINATION GAP',
    title: 'THE COORDINATION GAP',
    key: 'coordination_gap' as const,
    accentColor: '#1a8cff',
  },
]

export const CURRENT_STATE_NODES = [
  'Fragmented Data',
  'Siloed Decisions',
  'Reactive Workflows',
  'Delayed Insight',
]

export const ENABLED_STATE_NODES = [
  'Unified Signal Layer',
  'Coordinated Decisions',
  'Predictive Workflows',
  'Real-time Intelligence',
]
