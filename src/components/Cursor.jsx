import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, rafId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px)`
    }

    const tick = () => {
      rx += (mx - rx) * 0.09
      ry += (my - ry) * 0.09
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`
      rafId = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        dotRef.current?.classList.add('active')
        ringRef.current?.classList.add('active')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        dotRef.current?.classList.remove('active')
        ringRef.current?.classList.remove('active')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
    </>
  )
}
