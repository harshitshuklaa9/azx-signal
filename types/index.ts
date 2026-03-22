export type AppState = 'idle' | 'scanning' | 'complete'

export type Vertical = 'Energy' | 'Utilities' | 'Logistics' | 'Real Estate' | 'Cleantech' | 'Oil & Gas'

export interface AnalysisResult {
  hidden_failure: string
  why_ai_stalls: string
  coordination_gap: string
  opening_question: string
}

export interface Sources {
  newsCount: number
  jobsCount: number
  pressCount: number
  hasOverview: boolean
}

export interface ExampleChip {
  label: string
  company: string
  vertical: Vertical
}
