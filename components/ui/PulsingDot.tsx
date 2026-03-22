export default function PulsingDot() {
  return (
    <span
      className="pulse-dot inline-block rounded-full"
      style={{
        width: 7,
        height: 7,
        backgroundColor: 'var(--green)',
        flexShrink: 0,
      }}
    />
  )
}
