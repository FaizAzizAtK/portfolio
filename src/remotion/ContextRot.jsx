import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

const DURATION = 150  // half-period (ping-pong)
const W = 800
const H = 350

// Fixed token layout — each token has a phase offset so they enter at different times
const TOKENS = Array.from({ length: 28 }, (_, i) => {
  const row = i % 7
  return {
    id: i,
    y: 38 + row * 42,
    width: 36 + ((i * 23 + 17) % 68),
    height: 14,
    phase: (i * 61) % DURATION,       // offset in the loop cycle
    speed: 0.9 + (i * 0.09) % 0.5,    // slightly different speeds
    isKey: i % 7 === 0,                // "important" token
    row,
  }
})

// A token's x position and opacity given the current frame
function tokenState(token, frame) {
  // Each token moves from right (x=W+10) to left (x=-token.width-10) over DURATION/speed frames
  const cycleDuration = DURATION / token.speed
  const t = ((frame + token.phase) % cycleDuration) / cycleDuration
  const x = W + 10 - t * (W + token.width + 20)

  // Opacity: fresh on the right (high), decays toward the left
  // "context window" is roughly the right 70% of the screen
  const freshThreshold = W * 0.75
  const staleThreshold = W * 0.15
  const opacity = x > freshThreshold
    ? 1
    : x > staleThreshold
    ? interpolate(x, [staleThreshold, freshThreshold], [0.08, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0.05

  return { x, opacity }
}

export const ContextRot = () => {
  const rawFrame = useCurrentFrame()
  // Ping-pong: 0 → 150 → 0 (seamless loop)
  const frame = rawFrame <= DURATION ? rawFrame : DURATION * 2 - rawFrame

  // Slow horizontal grid lines as background
  const gridOpacity = 0.06

  // Label fade-in
  const labelOp = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // "Context window" bracket — shows the active region
  const bracketX = W * 0.28
  const bracketW = W * 0.7

  return (
    <AbsoluteFill style={{ background: '#0a0a0a' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          {/* Fade mask: right side bright, left side dim */}
          <linearGradient id="contextFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#0a0a0a" stopOpacity="0.9" />
            <stop offset="20%"  stopColor="#0a0a0a" stopOpacity="0.5" />
            <stop offset="60%"  stopColor="#0a0a0a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background grid lines */}
        {Array.from({ length: 7 }, (_, r) => (
          <line key={r} x1={0} y1={38 + r * 42 + 7} x2={W} y2={38 + r * 42 + 7}
            stroke="#ffffff" strokeWidth={0.3} opacity={gridOpacity} />
        ))}

        {/* Context window bracket */}
        <rect x={bracketX} y={20} width={bracketW} height={H - 40}
          fill="none" stroke="#3b82f6" strokeWidth={0.5} opacity={0.12} rx={2} />

        {/* Tokens */}
        {TOKENS.map((token) => {
          const { x, opacity } = tokenState(token, frame)
          const fill = token.isKey ? '#3b82f6' : '#d4d4d4'
          const alpha = token.isKey ? Math.min(opacity * 1.5, 1) : opacity
          return (
            <rect
              key={token.id}
              x={x} y={token.y}
              width={token.width} height={token.height}
              rx={2}
              fill={fill}
              opacity={alpha}
            />
          )
        })}

        {/* Decay overlay — left side fade mask */}
        <rect x={0} y={0} width={W} height={H} fill="url(#contextFade)" />

        {/* Labels */}
        <text x={W - 12} y={18} textAnchor="end" fontSize={8}
          fontFamily="'Courier New', monospace" letterSpacing="0.14em" fill="#3b82f6" opacity={labelOp}>
          ACTIVE CONTEXT
        </text>
        <text x={16} y={18} fontSize={8}
          fontFamily="'Courier New', monospace" letterSpacing="0.14em" fill="#555" opacity={labelOp}>
          FORGOTTEN
        </text>
        <text x={W / 2} y={H - 12} textAnchor="middle" fontSize={8}
          fontFamily="'Courier New', monospace" letterSpacing="0.16em" fill="#555" opacity={labelOp}>
          CONTEXT WINDOW
        </text>
      </svg>
    </AbsoluteFill>
  )
}
