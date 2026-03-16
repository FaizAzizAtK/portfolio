import { useEffect, useRef } from 'react'

// ── HSL helpers for saturation boost ─────────────────────────────────────────
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max === min) { h = s = 0 } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      default: h = ((r - g) / d + 4) / 6
    }
  }
  return [h, s, l]
}
function hue2rgb(p, q, t) {
  if (t < 0) t += 1; if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}
function hslToRgb(h, s, l) {
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v] }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ]
}
function boostSat(r, g, b, pct) {
  if (pct === 0) return [r, g, b]
  const [h, s, l] = rgbToHsl(r, g, b)
  return hslToRgb(h, Math.min(1, Math.max(0, s + pct / 100)), l)
}

// ── Physics constants ─────────────────────────────────────────────────────────
const REPULSION_RADIUS = 90   // px — how far the cursor pushes dots
const REPULSION_FORCE  = 10   // push strength
const SPRING           = 0.06 // how fast dots snap back home
const DAMPING          = 0.80 // velocity friction per frame

// ── Component ─────────────────────────────────────────────────────────────────
export default function DotPhoto({
  src,
  gridSize  = 7,
  satBoost  = 60,
  smoothing = 1.5,   // pre-blur px before sampling — smooths skin texture
  colored   = true,
  square    = false, // render as square canvas (circle-crop friendly)
  focalY    = 0.35,  // 0–1: vertical centre of crop when square=true
  shiftX    = 0,     // px: shift subject left (-) or right (+) within canvas
  intro     = false, // animate dots flying in from corner on scroll-into-view
  className = '',
}) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({
    dots: [], mouse: { x: -9999, y: -9999 }, raf: null,
    introduced: false, introStart: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !src) return
    const state = stateRef.current
    state.introduced = false
    state.introStart = 0
    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const runIntro = intro && !prefersReduced

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      // ── size ──────────────────────────────────────────────────────────────
      const maxEdge = 900
      const scale   = Math.min(1, maxEdge / Math.max(img.width, img.height))
      const W       = Math.round(img.width  * scale)
      const H       = Math.round(img.height * scale)

      // ── square crop region ────────────────────────────────────────────────
      const H2      = square ? W : H
      const cropTop = square ? Math.max(0, Math.min(H - W, Math.round(focalY * H - W / 2))) : 0

      // ── offscreen sample canvas ───────────────────────────────────────────
      const off    = document.createElement('canvas')
      off.width    = W; off.height = H
      const offCtx = off.getContext('2d', { willReadFrequently: true })
      if (smoothing > 0) offCtx.filter = `blur(${smoothing}px)`
      offCtx.drawImage(img, 0, 0, W, H)
      offCtx.filter = 'none'
      const { data } = offCtx.getImageData(0, 0, W, H)

      // ── HiDPI visible canvas ──────────────────────────────────────────────
      const dpr     = window.devicePixelRatio || 1
      canvas.width  = W  * dpr
      canvas.height = H2 * dpr
      ctx.scale(dpr, dpr)

      // ── build particles ───────────────────────────────────────────────────
      const g    = gridSize
      const maxR = g * 0.55
      const dots = []

      const rowStart = cropTop + g / 2
      const rowEnd   = cropTop + H2

      for (let row = rowStart; row < rowEnd; row += g) {
        for (let col = g / 2; col < W; col += g) {
          const px  = Math.round(col)
          const py  = Math.round(row)
          const idx = (py * W + px) * 4
          const a   = data[idx + 3] / 255
          if (a < 0.1) continue

          const [rr, gg, bb] = boostSat(data[idx], data[idx + 1], data[idx + 2], satBoost)
          const lum = (0.299 * rr + 0.587 * gg + 0.114 * bb) / 255
          const r   = maxR * (1 - lum) * a
          if (r < 0.4) continue

          const cy = row - cropTop
          const cx = col + shiftX
          if (cx < 0 || cx > W) continue

          // Each dot starts at a random position far outside the canvas —
          // random angle, 2–3× canvas diagonal away from its home position
          const diagonal = Math.hypot(W, H2)
          const angle    = Math.random() * Math.PI * 2
          const dist     = diagonal * (2 + Math.random())

          dots.push({
            hx: cx, hy: cy,
            x:  runIntro ? cx + Math.cos(angle) * dist : cx,
            y:  runIntro ? cy + Math.sin(angle) * dist : cy,
            vx: 0, vy: 0,
            r,
            color: colored ? `rgb(${rr},${gg},${bb})` : '#0a0a0a',
            active: !runIntro,
            introDelay: runIntro ? Math.random() * 1200 : 0,
          })
        }
      }

      state.dots = dots

      // ── animation loop ────────────────────────────────────────────────────
      function tick() {
        ctx.clearRect(0, 0, W, H2)
        const mx = state.mouse.x
        const my = state.mouse.y
        const elapsed = state.introduced
          ? performance.now() - state.introStart
          : 0

        for (const d of dots) {
          // activate dot when its delay has passed
          if (!d.active && state.introduced && elapsed >= d.introDelay) {
            d.active = true
          }

          if (!d.active) continue  // not yet released — still outside canvas

          // repulsion from cursor
          const dx   = d.x - mx
          const dy   = d.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPULSION_RADIUS && dist > 0) {
            const strength = (REPULSION_RADIUS - dist) / REPULSION_RADIUS
            d.vx += (dx / dist) * strength * REPULSION_FORCE
            d.vy += (dy / dist) * strength * REPULSION_FORCE
          }

          // spring home
          d.vx += (d.hx - d.x) * SPRING
          d.vy += (d.hy - d.y) * SPRING

          // damping
          d.vx *= DAMPING
          d.vy *= DAMPING

          // integrate
          d.x += d.vx
          d.y += d.vy

          // draw
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
          ctx.fillStyle = d.color
          ctx.fill()
        }

        state.raf = requestAnimationFrame(tick)
      }

      if (state.raf) cancelAnimationFrame(state.raf)
      state.raf = requestAnimationFrame(tick)

      // ── intro trigger via IntersectionObserver ────────────────────────────
      if (runIntro) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !state.introduced) {
              state.introduced  = true
              state.introStart  = performance.now()
              observer.disconnect()
            }
          },
          { threshold: 0.25 }
        )
        observer.observe(canvas)
        // store cleanup ref on state so we can disconnect on unmount
        state.introObserver = observer
      }
    }

    img.src = src

    // ── mouse tracking (hover: pointer devices only) ─────────────────────────
    const isTouch = window.matchMedia('(hover: none)').matches
    const onMove = (e) => {
      const rect   = canvas.getBoundingClientRect()
      const scaleX = (canvas.width  / (window.devicePixelRatio || 1)) / rect.width
      const scaleY = (canvas.height / (window.devicePixelRatio || 1)) / rect.height
      stateRef.current.mouse.x = (e.clientX - rect.left) * scaleX
      stateRef.current.mouse.y = (e.clientY - rect.top)  * scaleY
    }
    const onLeave = () => {
      stateRef.current.mouse.x = -9999
      stateRef.current.mouse.y = -9999
    }

    // ── click / tap: burst jitter on all dots ────────────────────────────────
    const onTap = () => {
      for (const d of state.dots) {
        if (!d.active) continue
        const angle = Math.random() * Math.PI * 2
        const force = 4 + Math.random() * 6
        d.vx += Math.cos(angle) * force
        d.vy += Math.sin(angle) * force
      }
    }

    if (!isTouch) {
      canvas.addEventListener('mousemove', onMove)
      canvas.addEventListener('mouseleave', onLeave)
    }
    canvas.addEventListener('click', onTap)

    return () => {
      if (!isTouch) {
        canvas.removeEventListener('mousemove', onMove)
        canvas.removeEventListener('mouseleave', onLeave)
      }
      canvas.removeEventListener('click', onTap)
      if (stateRef.current.raf) cancelAnimationFrame(stateRef.current.raf)
      if (stateRef.current.introObserver) stateRef.current.introObserver.disconnect()
    }
  }, [src, gridSize, satBoost, smoothing, colored, square, focalY, shiftX, intro])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ cursor: 'none', display: 'block', width: '100%', height: '100%' }}
      role="img"
      aria-label="Portrait of Faiz Aziz"
    />
  )
}
