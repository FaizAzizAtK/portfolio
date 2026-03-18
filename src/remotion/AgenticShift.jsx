import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

const W = 800, H = 350
const HALF = 120
const CX = W / 2, CY = H / 2

// Diamond layout: PLAN(top) → TOOL(right) → EXECUTE(bottom) → ADAPT(left)
const R = 95
const NODES = [
  { id: 0, label: 'PLAN',    a: -90 },
  { id: 1, label: 'TOOL',    a:   0 },
  { id: 2, label: 'EXECUTE', a:  90 },
  { id: 3, label: 'ADAPT',   a: 180 },
].map(n => ({
  ...n,
  x: CX + R * Math.cos(n.a * Math.PI / 180),
  y: CY + R * Math.sin(n.a * Math.PI / 180),
}))

function lerp(a, b, t) { return a + (b - a) * t }

export const AgenticShift = () => {
  const rawFrame = useCurrentFrame()
  // Ping-pong: 0 → 120 → 0 (seamless loop, no frame jump)
  const frame = rawFrame <= HALF ? rawFrame : HALF * 2 - rawFrame

  // Edges and nodes fade in
  const edgesOp = interpolate(frame, [0, 22], [0, 0.22], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const nodesOp = interpolate(frame, [5, 28], [0, 1],    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Particle travels full loop: frame 38 → 120
  const particleT  = interpolate(frame, [38, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const loopProg   = particleT * 4   // 0–4 across 4 segments
  const segIdx     = Math.min(3, Math.floor(loopProg))
  const segT       = loopProg - segIdx
  const fromN      = NODES[segIdx]
  const toN        = NODES[(segIdx + 1) % 4]
  const px         = lerp(fromN.x, toN.x, segT)
  const py         = lerp(fromN.y, toN.y, segT)

  // Human-oversight crosshair at center — fades out as agent takes over
  const cursorOp = interpolate(frame, [0, 18], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
                   interpolate(frame, [42, 60], [1, 0],   { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Phase labels
  const copilotOp  = interpolate(frame, [5, 22],   [0, 0.65], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
                     interpolate(frame, [42, 56],   [1, 0],    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const autoOp     = interpolate(frame, [68, 88],   [0, 1],    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: '#0a0a0a' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>

        {/* ── Static dim edges ── */}
        {NODES.map((n, i) => {
          const next = NODES[(i + 1) % 4]
          return (
            <line key={i}
              x1={n.x} y1={n.y} x2={next.x} y2={next.y}
              stroke="#ffffff" strokeWidth={0.6} opacity={edgesOp}
            />
          )
        })}

        {/* ── Blue trail left by the particle ── */}
        {NODES.map((n, i) => {
          const next      = NODES[(i + 1) % 4]
          const segFill   = Math.max(0, Math.min(1, loopProg - i))
          if (segFill === 0) return null
          return (
            <line key={`trail-${i}`}
              x1={n.x} y1={n.y}
              x2={lerp(n.x, next.x, segFill)}
              y2={lerp(n.y, next.y, segFill)}
              stroke="#3b82f6" strokeWidth={1.3}
              opacity={0.7}
            />
          )
        })}

        {/* ── Center human crosshair ── */}
        <g opacity={cursorOp}>
          <line x1={CX - 13} y1={CY} x2={CX + 13} y2={CY} stroke="#888" strokeWidth={0.7} />
          <line x1={CX} y1={CY - 13} x2={CX} y2={CY + 13} stroke="#888" strokeWidth={0.7} />
          <circle cx={CX} cy={CY} r={3.5} fill="none" stroke="#888" strokeWidth={0.7} />
          <text x={CX} y={CY + 22} textAnchor="middle"
            fontSize={6} fontFamily="'Courier New', monospace"
            letterSpacing="0.1em" fill="#555">HUMAN</text>
        </g>

        {/* ── Nodes ── */}
        {NODES.map((n, i) => {
          const activated = loopProg > i + 0.15
          const labelX = i === 1 ? n.x + 19 : i === 3 ? n.x - 19 : n.x
          const labelY = i === 0 ? n.y - 17 : i === 2 ? n.y + 21 : n.y + 4
          const anchor = i === 1 ? 'start' : i === 3 ? 'end' : 'middle'
          return (
            <g key={n.id} opacity={nodesOp}>
              {activated && (
                <circle cx={n.x} cy={n.y} r={16} fill="#3b82f6" opacity={0.14} />
              )}
              <circle cx={n.x} cy={n.y} r={6.5}
                fill={activated ? '#3b82f6' : '#1c1c1c'}
                stroke={activated ? '#3b82f6' : '#3a3a3a'}
                strokeWidth={0.9}
              />
              <text x={labelX} y={labelY} textAnchor={anchor}
                fontSize={7} fontFamily="'Courier New', monospace"
                letterSpacing="0.12em"
                fill={activated ? '#3b82f6' : '#444'}
              >
                {n.label}
              </text>
            </g>
          )
        })}

        {/* ── Traveling particle ── */}
        {particleT > 0 && (
          <>
            <circle cx={px} cy={py} r={4}   fill="#3b82f6" opacity={0.95} />
            <circle cx={px} cy={py} r={7.5} fill="none" stroke="#3b82f6" strokeWidth={0.6} opacity={0.3} />
          </>
        )}

        {/* ── Phase labels ── */}
        <text x={CX} y={H - 20} textAnchor="middle"
          fontSize={8} fontFamily="'Courier New', monospace"
          letterSpacing="0.2em" fill="#555" opacity={copilotOp}>
          CO-PILOT
        </text>
        <text x={CX} y={H - 20} textAnchor="middle"
          fontSize={8} fontFamily="'Courier New', monospace"
          letterSpacing="0.2em" fill="#3b82f6" opacity={autoOp}>
          AUTONOMOUS
        </text>

      </svg>
    </AbsoluteFill>
  )
}
