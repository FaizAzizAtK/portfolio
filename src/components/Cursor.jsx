import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const aRef = useRef(null)  // lead dot — fast, snappy
  const bRef = useRef(null)  // follow dot — slow, trails A

  useEffect(() => {
    let mx = 0, my = 0
    let ax = 0, ay = 0   // dot A position
    let bx = 0, by = 0   // dot B position
    let isHover = false
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      // A tracks mouse — slightly smoothed so it doesn't feel robotic
      ax += (mx - ax) * 0.22
      ay += (my - ay) * 0.22

      // B tracks A — much slower: creates the "companion lagging behind" effect
      const lerpB = isHover ? 0.16 : 0.07
      bx += (ax - bx) * lerpB
      by += (ay - by) * lerpB

      if (aRef.current) aRef.current.style.transform = `translate(${ax}px, ${ay}px)`
      if (bRef.current) bRef.current.style.transform = `translate(${bx}px, ${by}px)`

      raf = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        isHover = true
        aRef.current?.classList.add('active')
        bRef.current?.classList.add('active')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        isHover = false
        aRef.current?.classList.remove('active')
        bRef.current?.classList.remove('active')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={aRef} className="cur-a" />
      <div ref={bRef} className="cur-b" />
    </>
  )
}
