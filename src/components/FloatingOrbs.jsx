import { useEffect, useRef } from 'react'
import './FloatingOrbs.css'

export default function FloatingOrbs() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0   // raw mouse (normalised -0.5 → 0.5)
    let cx = 0, cy = 0   // smoothed orb-1 offset
    let dx = 0, dy = 0   // smoothed orb-2 offset (counter)
    let raf

    const onMove = (e) => {
      mx = e.clientX / window.innerWidth  - 0.5
      my = e.clientY / window.innerHeight - 0.5
    }

    const tick = () => {
      // orb1 slowly follows cursor
      cx += (mx * 90  - cx) * 0.03
      cy += (my * 70  - cy) * 0.03
      // orb2 drifts the opposite direction — creates "tension"
      dx += (-mx * 130 - dx) * 0.025
      dy += (-my * 100 - dy) * 0.025

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${cx}px, ${cy}px)`
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${dx}px, ${dy}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="orbs" aria-hidden="true">
      <div className="orb orb--1" ref={orb1Ref} />
      <div className="orb orb--2" ref={orb2Ref} />
    </div>
  )
}
