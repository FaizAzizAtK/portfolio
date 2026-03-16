import { useEffect, useRef, useState, useMemo } from 'react'
import { data } from '../data'
import './Skills.css'

const CATEGORIES = [
  { key: 'delivery',    label: 'Delivery' },
  { key: 'development', label: 'Development' },
  { key: 'tools',       label: 'AI Tools' },
]

// Pre-positioned nodes in a 900×500 viewBox
const NODE_DATA = [
  // Delivery (left cluster)
  { id: 'd0', label: 'Enterprise Architecture', group: 'delivery',    x: 100, y: 55  },
  { id: 'd1', label: 'Solution Design',          group: 'delivery',    x: 145, y: 125 },
  { id: 'd2', label: 'Stakeholder Management',   group: 'delivery',    x: 100, y: 195 },
  { id: 'd3', label: 'Requirements Analysis',    group: 'delivery',    x: 145, y: 265 },
  { id: 'd4', label: 'Agile Delivery',           group: 'delivery',    x: 100, y: 335 },
  { id: 'd5', label: 'Client Presentations',     group: 'delivery',    x: 145, y: 405 },
  { id: 'd6', label: 'Change Management',        group: 'delivery',    x: 100, y: 472 },
  // Development (center cluster)
  { id: 'v0', label: 'Python',                   group: 'development', x: 420, y: 55  },
  { id: 'v1', label: 'AI Agents',                group: 'development', x: 455, y: 125 },
  { id: 'v2', label: 'LLMs',                     group: 'development', x: 420, y: 195 },
  { id: 'v3', label: 'RAG',                      group: 'development', x: 455, y: 265 },
  { id: 'v4', label: 'Context Engineering',      group: 'development', x: 420, y: 335 },
  { id: 'v5', label: 'Prompt Engineering',       group: 'development', x: 455, y: 405 },
  { id: 'v6', label: 'API Integration',          group: 'development', x: 438, y: 472 },
  // AI Tools (right cluster)
  { id: 't0', label: 'LangChain',                group: 'tools',       x: 755, y: 55  },
  { id: 't1', label: 'MCPs',                     group: 'tools',       x: 793, y: 125 },
  { id: 't2', label: 'LLM Observability',        group: 'tools',       x: 755, y: 195 },
  { id: 't3', label: 'Vector DBs',               group: 'tools',       x: 793, y: 265 },
  { id: 't4', label: 'Git',                      group: 'tools',       x: 755, y: 335 },
  { id: 't5', label: 'VS Code',                  group: 'tools',       x: 793, y: 405 },
  { id: 't6', label: 'Tooling Design',           group: 'tools',       x: 774, y: 472 },
]

const EDGES = [
  // Within-group chains
  ['d0','d1'], ['d1','d2'], ['d2','d3'], ['d3','d4'], ['d4','d5'], ['d5','d6'],
  ['v0','v1'], ['v1','v2'], ['v2','v3'], ['v3','v4'], ['v4','v5'], ['v5','v6'],
  ['t0','t1'], ['t1','t2'], ['t2','t3'], ['t3','t4'], ['t4','t5'], ['t5','t6'],
  // Cross-group
  ['v1','t0'], // AI Agents → LangChain
  ['v3','t3'], // RAG → Vector DBs
]

const CAT_LABELS = [
  { label: 'Delivery',    x: 122, y: 20 },
  { label: 'Development', x: 438, y: 20 },
  { label: 'AI Tools',    x: 774, y: 20 },
]

function SkillsNetwork({ revealed }) {
  const [hovered, setHovered] = useState(null)

  const nodeMap = useMemo(() => {
    const m = {}
    NODE_DATA.forEach(n => { m[n.id] = n })
    return m
  }, [])

  const { connectedIds, activeEdgeIndices } = useMemo(() => {
    if (!hovered) return { connectedIds: new Set(), activeEdgeIndices: new Set() }
    const cids = new Set()
    const aei  = new Set()
    EDGES.forEach(([a, b], i) => {
      if (a === hovered || b === hovered) {
        cids.add(a === hovered ? b : a)
        aei.add(i)
      }
    })
    return { connectedIds: cids, activeEdgeIndices: aei }
  }, [hovered])

  const getNodeState = (id) => {
    if (!hovered) return 'default'
    if (id === hovered) return 'active'
    if (connectedIds.has(id)) return 'connected'
    return 'dimmed'
  }

  const getEdgeState = (i) => {
    if (!hovered) return 'default'
    if (activeEdgeIndices.has(i)) return 'active'
    return 'dimmed'
  }

  return (
    <svg
      className="skills__svg"
      viewBox="0 0 900 500"
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Skills network graph"
    >
      {CAT_LABELS.map(cl => (
        <text key={cl.label} x={cl.x} y={cl.y} className="skills__cat-label" textAnchor="middle">
          {cl.label}
        </text>
      ))}

      {EDGES.map(([aId, bId], i) => {
        const a = nodeMap[aId]
        const b = nodeMap[bId]
        return (
          <line
            key={i}
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            className={`skills__edge skills__edge--${getEdgeState(i)}`}
          />
        )
      })}

      {NODE_DATA.map((node) => {
        const state   = getNodeState(node.id)
        const isRight = node.group === 'tools'
        return (
          <g
            key={node.id}
            className={`skills__node-g skills__node-g--${state} ${revealed ? 'skills__node-g--in' : ''}`}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={5}
              className={`skills__node skills__node--${state}`}
            />
            <text
              x={node.x}
              y={node.y}
              dx={isRight ? -10 : 10}
              dy="0.35em"
              textAnchor={isRight ? 'end' : 'start'}
              className={`skills__node-label skills__node-label--${state}`}
            >
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Skills() {
  const ref                  = useRef(null)
  const [revealed,   setRevealed]   = useState(false)
  const [isMobile,   setIsMobile]   = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 120)
          })
          setTimeout(() => setRevealed(true), 300)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="skills__inner">

        <div className="skills__left">
          <div className="section-label reveal">
            <span className="section-num">04</span>
            <span className="section-name">Skills</span>
          </div>
          <h2 className="skills__heading reveal">
            What I<br />bring
          </h2>
        </div>

        <div className="skills__right reveal" style={{ transitionDelay: '0.15s' }}>
          {isMobile ? (
            <div className="skills__map">
              {CATEGORIES.map((cat, ci) => (
                <div key={cat.key} className="skills__track">
                  <div className="skills__track-header">
                    <span className="skills__track-dot" />
                    <span className="skills__track-label">{cat.label}</span>
                  </div>
                  <div className="skills__track-chips">
                    {data.skills[cat.key].map((skill, i) => (
                      <button
                        key={skill}
                        className={`skills__chip ${revealed ? 'skills__chip--in' : ''} ${hoveredSkill === skill ? 'skills__chip--active' : ''}`}
                        style={{ transitionDelay: revealed ? `${ci * 0.12 + i * 0.05}s` : '0s' }}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        tabIndex={0}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SkillsNetwork revealed={revealed} />
          )}
        </div>

      </div>
    </section>
  )
}
