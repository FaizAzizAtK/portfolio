import { useEffect, useRef } from 'react'
import './Sphere.css'

// All nodes on the sphere — primary = the 4 typewriter roles, secondary = supporting skills
const NODES = [
  { phi: 0.0,  theta: 1.15, text: 'Agentic AI Engineer',   primary: true },
  { phi: 1.57, theta: 1.65, text: 'Context Engineering',     primary: true },
  { phi: 3.14, theta: 0.95, text: 'Frontend Developer',     primary: true },
  { phi: 4.71, theta: 1.40, text: 'AI & Agents',            primary: true },
  { phi: 0.85, theta: 0.42, text: 'LLMs',                  primary: false },
  { phi: 2.30, theta: 2.45, text: 'Prompt Engineering',     primary: false },
  { phi: 5.20, theta: 1.22, text: 'React',                 primary: false },
  { phi: 3.80, theta: 0.52, text: 'Enterprise AI',         primary: false },
  { phi: 1.10, theta: 2.10, text: 'Python',                primary: false },
  { phi: 4.10, theta: 2.30, text: 'Agent Workflows',        primary: false },
  { phi: 2.80, theta: 1.70, text: 'Open Source',           primary: false },
  { phi: 5.80, theta: 0.72, text: 'spart-prompt',          primary: false },
  { phi: 1.90, theta: 0.78, text: 'AI Strategy',           primary: false },
  { phi: 4.40, theta: 1.85, text: 'Data Strategy',         primary: false },
]

// Spherical → cartesian (unit sphere)
function toCart(phi, theta) {
  return {
    x: Math.sin(theta) * Math.cos(phi),
    y: -Math.cos(theta),
    z: Math.sin(theta) * Math.sin(phi),
  }
}

// Rotate around Y then X
function rotate(p, ry, rx) {
  const x1 = p.x * Math.cos(ry) + p.z * Math.sin(ry)
  const z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry)
  const y2 = p.y * Math.cos(rx) - z1 * Math.sin(rx)
  const z2 = p.y * Math.sin(rx) + z1 * Math.cos(rx)
  return { x: x1, y: y2, z: z2 }
}

export default function Sphere() {
  const canvasRef = useRef(null)
  const wrapRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')

    let ry = 0.4
    let rx = 0.25
    let dragging = false
    let lastX = 0, lastY = 0
    let raf = null
    let hoveredIdx = -1
    // Momentum
    let velY = 0, velX = 0
    const FRICTION = 0.90
    const VEL_MIN  = 0.0003
    const moveLog  = []  // { dy: rotY delta, dx: rotX delta, t: timestamp }

    // ── sizing ──────────────────────────────────────────
    let baseSize = 0
    function resize() {
      const { width, height } = wrap.getBoundingClientRect()
      baseSize = Math.min(width, height)
      // Canvas is 1.5× the wrap so text labels have room beyond the sphere edge
      const padded = baseSize * 1.5
      canvas.width  = padded * window.devicePixelRatio
      canvas.height = padded * window.devicePixelRatio
      canvas.style.width  = padded + 'px'
      canvas.style.height = padded + 'px'
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // ── draw ─────────────────────────────────────────────
    function draw() {
      const W  = canvas.width
      const H  = canvas.height
      const cx = W / 2
      const cy = H / 2
      const dpr = window.devicePixelRatio
      // Sphere radius is based on the original (unpadded) container size
      // so it stays visually the same size while text has room beyond it
      const r  = baseSize * 0.28 * dpr

      ctx.clearRect(0, 0, W, H)

      // — wireframe —
      const GRID_LAT = 7
      const GRID_LON = 10
      const STEPS    = 80

      ctx.lineWidth = 0.8 * dpr

      // latitude rings
      for (let i = 1; i < GRID_LAT; i++) {
        const theta = (Math.PI / GRID_LAT) * i
        const ry_  = Math.sin(theta)
        const y_   = -Math.cos(theta)
        ctx.beginPath()
        for (let j = 0; j <= STEPS; j++) {
          const phi = (j / STEPS) * Math.PI * 2
          const rot = rotate({ x: ry_ * Math.cos(phi), y: y_, z: ry_ * Math.sin(phi) }, ry, rx)
          const alpha = 0.04 + 0.04 * ((rot.z + 1) / 2)
          ctx.strokeStyle = `rgba(10,10,10,${alpha.toFixed(3)})`
          const px = cx + rot.x * r
          const py = cy + rot.y * r
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.stroke()
      }

      // longitude arcs
      for (let i = 0; i < GRID_LON; i++) {
        const phi = (i / GRID_LON) * Math.PI * 2
        ctx.beginPath()
        for (let j = 0; j <= STEPS; j++) {
          const theta = (j / STEPS) * Math.PI
          const rot = rotate({
            x: Math.sin(theta) * Math.cos(phi),
            y: -Math.cos(theta),
            z: Math.sin(theta) * Math.sin(phi),
          }, ry, rx)
          const alpha = 0.04 + 0.04 * ((rot.z + 1) / 2)
          ctx.strokeStyle = `rgba(10,10,10,${alpha.toFixed(3)})`
          const px = cx + rot.x * r
          const py = cy + rot.y * r
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.stroke()
      }

      // — project all nodes, sort back-to-front —
      const projected = NODES.map((n, i) => {
        const p3  = toCart(n.phi, n.theta)
        const rot = rotate(p3, ry, rx)
        const depth = (rot.z + 1) / 2          // 0 = back, 1 = front
        return {
          ...n,
          px: cx + rot.x * r,
          py: cy + rot.y * r,
          depth,
          z: rot.z,
          idx: i,
        }
      }).sort((a, b) => a.z - b.z)

      // — draw nodes —
      for (const pt of projected) {
        const isHovered = pt.idx === hoveredIdx
        const alpha = pt.depth < 0.5
          ? Math.max(0.06, pt.depth * 0.55)
          : 0.22 + pt.depth * 0.78

        const dotR  = (pt.primary ? 3 : 2) * dpr
        const fSize = pt.primary
          ? Math.round((10 + pt.depth * 2.5) * dpr)
          : Math.round((8  + pt.depth * 2)   * dpr)

        // connector tick
        ctx.beginPath()
        ctx.moveTo(pt.px, pt.py)
        const tx = pt.px + (pt.px > cx ? 1 : -1) * (dotR + 3 * dpr)
        ctx.lineTo(tx, pt.py)
        ctx.strokeStyle = `rgba(10,10,10,${(alpha * 0.5).toFixed(3)})`
        ctx.lineWidth = 0.7 * dpr
        ctx.stroke()

        // dot
        ctx.beginPath()
        ctx.arc(pt.px, pt.py, dotR, 0, Math.PI * 2)
        ctx.fillStyle = isHovered
          ? `rgba(10,10,10,${Math.min(1, alpha * 1.4).toFixed(3)})`
          : `rgba(10,10,10,${alpha.toFixed(3)})`
        ctx.fill()

        // label
        const fw = pt.primary ? '600' : '400'
        ctx.font = `${fw} ${fSize}px 'Syne', sans-serif`
        const textAlpha = isHovered ? Math.min(1, alpha * 1.5) : alpha
        ctx.fillStyle = `rgba(10,10,10,${textAlpha.toFixed(3)})`
        const rightSide = pt.px >= cx
        ctx.textAlign = rightSide ? 'left' : 'right'
        const offX = rightSide ? dotR + 6 * dpr : -(dotR + 6 * dpr)
        ctx.fillText(pt.text, pt.px + offX, pt.py + fSize * 0.36)
      }
    }

    // ── animation loop ────────────────────────────────
    function loop() {
      if (dragging) {
        // drag controls rotation directly
      } else if (Math.abs(velY) + Math.abs(velX) > VEL_MIN) {
        // momentum coast
        ry += velY
        rx += velX
        rx = Math.max(-1.2, Math.min(1.2, rx))
        velY *= FRICTION
        velX *= FRICTION
      } else {
        // settle back to gentle auto-rotate
        velY = 0; velX = 0
        ry += 0.0025
      }
      draw()
      raf = requestAnimationFrame(loop)
    }
    loop()

    // ── hit testing ───────────────────────────────────
    function hitTest(mx, my) {
      const rect = canvas.getBoundingClientRect()
      const dpr  = window.devicePixelRatio
      const cpx  = (mx - rect.left) * dpr
      const cpy  = (my - rect.top)  * dpr
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2, cy = H / 2
      const r  = baseSize * 0.28 * window.devicePixelRatio

      let closest = -1, minDist = 24 * dpr
      NODES.forEach((n, i) => {
        const rot = rotate(toCart(n.phi, n.theta), ry, rx)
        const px = cx + rot.x * r
        const py = cy + rot.y * r
        const d  = Math.hypot(cpx - px, cpy - py)
        if (d < minDist) { minDist = d; closest = i }
      })
      return closest
    }

    // ── mouse ─────────────────────────────────────────
    function onMouseDown(e) {
      dragging = true
      lastX = e.clientX; lastY = e.clientY
      canvas.style.cursor = 'none'
    }
    function onMouseMove(e) {
      if (dragging) {
        ry += (e.clientX - lastX) * 0.005
        rx += (e.clientY - lastY) * 0.005
        rx = Math.max(-1.2, Math.min(1.2, rx))
        lastX = e.clientX; lastY = e.clientY
      } else {
        const h = hitTest(e.clientX, e.clientY)
        hoveredIdx = h
        canvas.style.cursor = 'none'
      }
    }
    function onMouseUp() {
      dragging = false
      canvas.style.cursor = 'none'
      // Compute release velocity from recent moves (last 100 ms)
      const now = performance.now()
      const recent = moveLog.filter(m => now - m.t < 100)
      if (recent.length) {
        velY = recent.reduce((s, m) => s + m.dy, 0) / recent.length
        velX = recent.reduce((s, m) => s + m.dx, 0) / recent.length
      } else {
        velY = 0; velX = 0
      }
      moveLog.length = 0
    }
    function onMouseLeave() { hoveredIdx = -1 }

    // ── touch ─────────────────────────────────────────
    function onTouchStart(e) {
      const t = e.touches[0]
      dragging = true; lastX = t.clientX; lastY = t.clientY
    }
    function onTouchMove(e) {
      if (!dragging) return
      const t = e.touches[0]
      ry += (t.clientX - lastX) * 0.005
      rx += (t.clientY - lastY) * 0.005
      rx = Math.max(-1.2, Math.min(1.2, rx))
      lastX = t.clientX; lastY = t.clientY
    }
    function onTouchEnd() { dragging = false }

    // Split mousemove: drag tracking on window (so it works outside canvas),
    // hover detection on canvas only
    function onWindowMouseMove(e) {
      if (!dragging) return
      const dy = (e.clientX - lastX) * 0.005   // horizontal drag → Y-axis rotation
      const dx = (e.clientY - lastY) * 0.005   // vertical drag   → X-axis rotation
      ry += dy
      rx += dx
      rx = Math.max(-1.2, Math.min(1.2, rx))
      lastX = e.clientX; lastY = e.clientY
      // Log this move for velocity calculation on release
      const now = performance.now()
      moveLog.push({ dy, dx, t: now })
      // Keep only the last 100 ms of movements
      while (moveLog.length && now - moveLog[0].t > 100) moveLog.shift()
    }
    function onCanvasMouseMove(e) {
      if (dragging) return  // window handler takes over while dragging
      const h = hitTest(e.clientX, e.clientY)
      hoveredIdx = h
      canvas.style.cursor = 'none'
    }

    canvas.addEventListener('mousedown',  onMouseDown)
    canvas.addEventListener('mousemove',  onCanvasMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mousemove',  onWindowMouseMove)
    window.addEventListener('mouseup',    onMouseUp)
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove,  { passive: true })
    window.addEventListener('touchend',   onTouchEnd)
    canvas.style.cursor = 'none'

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousedown',  onMouseDown)
      canvas.removeEventListener('mousemove',  onCanvasMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mousemove',  onWindowMouseMove)
      window.removeEventListener('mouseup',    onMouseUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  return (
    <div className="sphere-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} className="sphere-canvas" aria-label="Interactive skill sphere" />
    </div>
  )
}
