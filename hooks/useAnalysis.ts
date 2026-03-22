import type { AnalysisResult, Sources } from '@/types'

export function useAnalysis() {
  function analyze(
    company: string,
    vertical: string,
    onScanLine: (line: string) => void,
    onSources: (sources: Sources) => void,
    onToken: (token: string) => void,
    onDone: (result: AnalysisResult) => void,
    onError: (error: string) => void
  ): void {
    // Fire-and-forget — callbacks handle all outcomes
    void (async () => {
      let res: Response

      try {
        res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company, vertical }),
        })
      } catch {
        onError('Analysis unavailable')
        return
      }

      if (!res.ok || !res.body) {
        onError('Analysis unavailable')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // Process all complete lines in the buffer
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const jsonStr = line.slice(6).trim()
            if (!jsonStr) continue

            try {
              const event = JSON.parse(jsonStr) as Record<string, unknown>

              if (event.type === 'scan' && typeof event.line === 'string') {
                onScanLine(event.line)
              } else if (event.type === 'sources' && event.data) {
                onSources(event.data as Sources)
              } else if (event.type === 'token' && typeof event.text === 'string') {
                accumulated += event.text
                onToken(event.text)
              } else if (event.type === 'done') {
                try {
                  const clean = accumulated
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .trim()
                  const result = JSON.parse(clean) as AnalysisResult
                  onDone(result)
                } catch {
                  onError('Failed to parse analysis')
                }
              } else if (
                event.type === 'error' &&
                typeof event.message === 'string'
              ) {
                onError(event.message)
              }
            } catch {
              // Skip malformed SSE events
            }
          }
        }
      } catch {
        onError('Stream interrupted')
      }
    })()
  }

  return { analyze }
}
