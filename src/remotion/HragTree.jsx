import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

const W = 800
const H = 350
const DURATION = 180

// Tree layout — root, 3 sections, 2 leaves each under middle section
const ROOT   = { id: 'root', x: W / 2, y: 48, label: 'TABLE OF CONTENTS' }

const L1 = [
  { id: 'l1-0', x: 185, y: 140, label: 'INTRODUCTION' },
  { id: 'l1-1', x: W / 2, y: 140, label: 'METHODOLOGY' },  // ← selected
  { id: 'l1-2', x: 615, y: 140, label: 'RESULTS' },
]

const L2 = [
  { id: 'l2-0', x: W / 2 - 65, y: 232, label: 'CHUNK 2.1', parentIdx: 1 }, // ← selected
  { id: 'l2-1', x: W / 2 + 65, y: 232, label: 'CHUNK 2.2', parentIdx: 1 },
]

// Dimmed sibling leaves (visual completeness)
const SIBLINGS = [
  { id: 's0', x: 135, y: 232, label: '', parentIdx: 0 },
  { id: 's1', x: 235, y: 232, label: '', parentIdx: 0 },
  { id: 's2', x: 565, y: 232, label: '', parentIdx: 2 },
  { id: 's3', x: 665, y: 232, label: '', parentIdx: 2 },
]

const NODE_R = 7
const SELECTED_R = 9

function useSpr(frame, fps, delay = 0, cfg = { damping: 16, mass: 0.5 }) {
  return spring({ frame: Math.max(0, frame - delay), fps, config: cfg })
}

// Draw an edge between two points with animated progress
function Edge({ x1, y1, x2, y2, progress, color, width = 0.8 }) {
  const ex = x1 + (x2 - x1) * progress
  const ey = y1 + (y2 - y1) * progress
  return <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={width} strokeLinecap="round" />
}

export const HragTree = () => {
  const rawFrame = useCurrentFrame()
  const { fps } = useVideoConfig()
  // Ping-pong: 0 → 180 → 0 (seamless loop)
  const frame = rawFrame <= DURATION ? rawFrame : DURATION * 2 - rawFrame

  // Phase timings
  // 0-15:   all nodes appear (dim)
  // 15-35:  root highlights
  // 35-60:  edge root→L1[1] draws + L1[1] highlights
  // 60-90:  edge L1[1]→L2[0] draws + L2[0] highlights
  // 90-130: L2[0] pulses — "retrieved"
  // 130-155: fade everything back to dim
  // 155-180: hold dim, loop reset

  const treeAppear = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Root highlight
  const rootHl = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rootDim = interpolate(frame, [35, 60], [1, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rootColor = `rgba(59,130,246,${rootHl * rootDim})`

  // Edge root → L1[1]
  const edge0Progress = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const edge0Dim = interpolate(frame, [60, 90], [1, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // L1[1] highlight
  const l1Hl  = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const l1Dim = interpolate(frame, [65, 95], [1, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Edge L1[1] → L2[0]
  const edge1Progress = interpolate(frame, [62, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const edge1Dim = interpolate(frame, [90, 120], [1, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // L2[0] highlight + pulse
  const l2Hl   = interpolate(frame, [78, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const l2Dim  = interpolate(frame, [130, 155], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const pulse  = Math.sin(((frame - 90) / 12) * Math.PI) * Math.max(0, Math.min(1, (frame - 90) / 10))
  const glowR  = SELECTED_R + 10 + pulse * 8

  // Overall fade-back for labels
  const labelOp = interpolate(frame, [5, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const fadeBack = interpolate(frame, [130, 155], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // "RETRIEVED" label
  const retrievedOp = interpolate(frame, [95, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * fadeBack

  // Static tree edges (all visible, dim)
  const staticEdges = [
    // root → L1[0]
    { x1: ROOT.x, y1: ROOT.y, x2: L1[0].x, y2: L1[0].y },
    // root → L1[2]
    { x1: ROOT.x, y1: ROOT.y, x2: L1[2].x, y2: L1[2].y },
    // L1[1] → L2[1]
    { x1: L1[1].x, y1: L1[1].y, x2: L2[1].x, y2: L2[1].y },
    // siblings
    ...SIBLINGS.map(s => ({ x1: L1[s.parentIdx].x, y1: L1[s.parentIdx].y, x2: s.x, y2: s.y })),
  ]

  return (
    <AbsoluteFill style={{ background: '#0a0a0a' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>

        {/* ── Static dim edges ── */}
        {staticEdges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="#333" strokeWidth={0.8} opacity={treeAppear * 0.7} />
        ))}

        {/* ── Highlighted path edges ── */}
        <Edge x1={ROOT.x} y1={ROOT.y} x2={L1[1].x} y2={L1[1].y}
          progress={edge0Progress} color={`rgba(59,130,246,${edge0Dim})`} width={1.5} />
        <Edge x1={L1[1].x} y1={L1[1].y} x2={L2[0].x} y2={L2[0].y}
          progress={edge1Progress} color={`rgba(59,130,246,${edge1Dim})`} width={1.5} />

        {/* ── Dim L1 nodes (non-selected) ── */}
        {[L1[0], L1[2]].map(n => (
          <g key={n.id} opacity={treeAppear * 0.5}>
            <circle cx={n.x} cy={n.y} r={NODE_R} fill="#2a2a2a" stroke="#444" strokeWidth={0.8} />
            <text x={n.x} y={n.y + NODE_R + 11} textAnchor="middle" fontSize={6.5}
              fontFamily="'Courier New', monospace" letterSpacing="0.1em" fill="#555">
              {n.label}
            </text>
          </g>
        ))}

        {/* ── Dim L2 non-selected ── */}
        <g opacity={treeAppear * 0.4}>
          <circle cx={L2[1].x} cy={L2[1].y} r={NODE_R - 1} fill="#2a2a2a" stroke="#444" strokeWidth={0.7} />
          <text x={L2[1].x} y={L2[1].y + NODE_R + 11} textAnchor="middle" fontSize={6}
            fontFamily="'Courier New', monospace" letterSpacing="0.1em" fill="#444">
            {L2[1].label}
          </text>
        </g>

        {/* ── Sibling nodes ── */}
        {SIBLINGS.map(s => (
          <circle key={s.id} cx={s.x} cy={s.y} r={NODE_R - 2}
            fill="#222" stroke="#333" strokeWidth={0.7} opacity={treeAppear * 0.45} />
        ))}

        {/* ── Root node ── */}
        <g opacity={treeAppear}>
          <circle cx={ROOT.x} cy={ROOT.y} r={NODE_R + 2} fill="#e5e5e5"
            opacity={0.2 + rootHl * rootDim * 0.8} />
          <circle cx={ROOT.x} cy={ROOT.y} r={NODE_R + 2} fill="none"
            stroke="#3b82f6" strokeWidth={1.2} opacity={rootHl * rootDim} />
          <text x={ROOT.x} y={ROOT.y - NODE_R - 7} textAnchor="middle" fontSize={6.5}
            fontFamily="'Courier New', monospace" letterSpacing="0.12em"
            fill="#888" opacity={labelOp * fadeBack}>
            {ROOT.label}
          </text>
        </g>

        {/* ── L1[1] selected node ── */}
        <g opacity={treeAppear}>
          <circle cx={L1[1].x} cy={L1[1].y} r={SELECTED_R} fill="#3b82f6"
            opacity={0.15 + l1Hl * l1Dim * 0.85} />
          <circle cx={L1[1].x} cy={L1[1].y} r={SELECTED_R} fill="none"
            stroke="#3b82f6" strokeWidth={1.2} opacity={l1Hl * l1Dim} />
          <text x={L1[1].x} y={L1[1].y + SELECTED_R + 12} textAnchor="middle" fontSize={6.5}
            fontFamily="'Courier New', monospace" letterSpacing="0.1em"
            fill="#3b82f6" opacity={l1Hl * l1Dim * labelOp}>
            {L1[1].label}
          </text>
        </g>

        {/* ── L2[0] retrieved node ── */}
        <g opacity={treeAppear}>
          {/* Glow ring */}
          <circle cx={L2[0].x} cy={L2[0].y} r={glowR}
            fill="none" stroke="#3b82f6" strokeWidth={1}
            opacity={Math.max(0, pulse) * l2Hl * l2Dim * 0.4} />
          <circle cx={L2[0].x} cy={L2[0].y} r={SELECTED_R} fill="#3b82f6"
            opacity={l2Hl * l2Dim} />
          <text x={L2[0].x} y={L2[0].y + SELECTED_R + 12} textAnchor="middle" fontSize={6.5}
            fontFamily="'Courier New', monospace" letterSpacing="0.1em"
            fill="#3b82f6" opacity={l2Hl * l2Dim * labelOp}>
            {L2[0].label}
          </text>
        </g>

        {/* ── RETRIEVED label ── */}
        <text x={L2[0].x} y={H - 18} textAnchor="middle" fontSize={8.5}
          fontFamily="'Courier New', monospace" letterSpacing="0.2em"
          fill="#3b82f6" opacity={retrievedOp}>
          RETRIEVED
        </text>

        {/* ── Hierarchy label ── */}
        <text x={W - 16} y={H - 18} textAnchor="end" fontSize={7}
          fontFamily="'Courier New', monospace" letterSpacing="0.14em"
          fill="#444" opacity={labelOp * fadeBack}>
          HIERARCHICAL INDEX
        </text>
      </svg>
    </AbsoluteFill>
  )
}
