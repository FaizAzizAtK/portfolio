import { useEffect, useState } from 'react'
import { data } from '../data'
import { SquiggleUnderline, HandAsterisk, ScribbleStar, ArrowDown, WavyLine } from './Icons'
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
        t = setTimeout(() => setShown(current.slice(0, shown.length + 1)), 58)
      } else {
        t = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(shown.slice(0, -1)), 30)
      } else {
        setIdx((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(t)
  }, [shown, typing, idx, roles])

  return (
    <span className="hero__typewriter">
      {shown}
      <span className="hero__caret" aria-hidden="true">|</span>
    </span>
  )
}

export default function Hero() {
  const scrollDown = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">

      {/* Floating doodle decorations */}
      <HandAsterisk size={30} color="var(--accent)"      className="hero__doodle hero__doodle--a" />
      <ScribbleStar size={22} color="var(--accent-2)"    className="hero__doodle hero__doodle--b" />
      <HandAsterisk size={18} color="var(--text-dim)"    className="hero__doodle hero__doodle--c" />
      <ScribbleStar size={28} color="var(--accent)"      className="hero__doodle hero__doodle--d" />

      <div className="hero__content">
        {/* Greeting */}
        <p className="hero__greeting">
          <WavyLine width={40} color="var(--accent)" className="hero__greeting-wave" />
          {data.hero.greeting}
        </p>

        {/* Name */}
        <h1 className="hero__name" aria-label="Faiz Aziz">
          <span className="hero__name-first">Faiz</span>
          <span className="hero__name-second">
            Aziz
            <span className="hero__squiggle" aria-hidden="true">
              <SquiggleUnderline width={220} color="var(--accent)" />
            </span>
          </span>
        </h1>

        {/* Role typewriter */}
        <div className="hero__role">
          <span className="hero__role-bracket">( </span>
          <Typewriter roles={data.hero.roles} />
          <span className="hero__role-bracket"> )</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="hero__bottom">
        <button className="hero__scroll" onClick={scrollDown} data-cursor>
          <ArrowDown size={22} color="var(--text-muted)" className="hero__scroll-icon" />
          <span className="hero__scroll-label">{data.hero.scrollLabel}</span>
        </button>
        <p className="hero__location">{data.about.location}</p>
      </div>
    </section>
  )
}
