import { useEffect, useState } from 'react'
import { data } from '../data'
import './Hero.css'

// Splits text into individually animated <span> chars
function SplitText({ text, baseDelay = 0, className = '' }) {
  return (
    <span className={`split-text ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ animationDelay: `${baseDelay + i * 0.045}s` }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

// Typewriter for cycling roles
function Typewriter({ roles }) {
  const [idx, setIdx]         = useState(0)
  const [displayed, setShown] = useState('')
  const [typing, setTyping]   = useState(true)

  useEffect(() => {
    const current = roles[idx]
    let t

    if (typing) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setShown(current.slice(0, displayed.length + 1)), 55)
      } else {
        t = setTimeout(() => setTyping(false), 2200)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setShown(displayed.slice(0, -1)), 28)
      } else {
        setIdx((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, typing, idx, roles])

  return (
    <span className="hero__typewriter">
      {displayed}
      <span className="hero__caret" aria-hidden="true">|</span>
    </span>
  )
}

export default function Hero() {
  const scrollDown = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      {/* Ambient light blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="hero__content">
        {/* Greeting row */}
        <p className="hero__greeting" style={{ animationDelay: '0.15s' }}>
          <span className="hero__greeting-dash" />
          {data.hero.greeting}
        </p>

        {/* Big name */}
        <h1 className="hero__name" aria-label="Faiz Aziz">
          <span className="hero__name-line">
            <SplitText text="Faiz" baseDelay={0.4} />
          </span>
          <span className="hero__name-line hero__name-line--italic">
            <SplitText text="Aziz" baseDelay={0.7} />
          </span>
        </h1>

        {/* Role typewriter */}
        <div className="hero__role" style={{ animationDelay: '1.4s' }}>
          <span className="hero__role-dash">—</span>
          <Typewriter roles={data.hero.roles} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero__bottom">
        <button className="hero__scroll" onClick={scrollDown} data-cursor>
          <span className="hero__scroll-label">{data.hero.scrollLabel}</span>
          <span className="hero__scroll-track" aria-hidden="true">
            <span className="hero__scroll-bead" />
          </span>
        </button>

        <p className="hero__location">{data.about.location}</p>
      </div>

      {/* Decorative large numeral */}
      <span className="hero__numeral" aria-hidden="true">01</span>
    </section>
  )
}
