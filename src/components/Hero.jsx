import { useEffect, useState } from 'react'
import { data } from '../data'
import './Hero.css'

function Typewriter({ roles }) {
  const [idx, setIdx]       = useState(0)
  const [shown, setShown]   = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[idx]
    let t
    if (typing) {
      if (shown.length < current.length) {
        t = setTimeout(() => setShown(current.slice(0, shown.length + 1)), 55)
      } else {
        t = setTimeout(() => setTyping(false), 2200)
      }
    } else {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(shown.slice(0, -1)), 28)
      } else {
        setIdx((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(t)
  }, [shown, typing, idx, roles])

  return (
    <span className="hero__type">
      {shown}<span className="hero__caret" />
    </span>
  )
}

export default function Hero() {
  const scrollDown = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <div className="hero__content">
        {/* Giant name with clip-reveal */}
        <h1 className="hero__name">
          <span className="clip-reveal" style={{ animationDelay: '0.2s' }}>
            <span>Faiz</span>
          </span>
          <span className="clip-reveal" style={{ animationDelay: '0.38s' }}>
            <span>Aziz</span>
          </span>
        </h1>

        {/* Blue accent dot */}
        <div className="hero__dot" aria-hidden="true" />

        {/* Sub: role + typewriter */}
        <div className="hero__sub">
          <span className="hero__role">{data.role}</span>
          <span className="hero__sep" />
          <Typewriter roles={data.hero.roles} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero__bottom">
        <p className="hero__loc">{data.location}</p>
        <button className="hero__scroll" onClick={scrollDown} data-cursor>
          <span className="hero__scroll-text">{data.hero.scrollLabel}</span>
          <span className="hero__scroll-arrow">↓</span>
        </button>
      </div>
    </section>
  )
}
