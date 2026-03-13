import { useEffect, useRef, useState } from 'react'
import { data } from '../data'
import './About.css'

function AnimatedStat({ value, label }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const num = parseInt(value)
          const suffix = value.replace(String(num), '')
          let i = 0
          const step = () => {
            i += 1
            setDisplay(Math.min(i, num) + suffix)
            if (i < num) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="stat" ref={ref}>
      <span className="stat__val">{display}</span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 120)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__left reveal">
        <div className="section-label">
          <span className="section-num">01</span>
          <span className="section-name">About</span>
        </div>
      </div>

      <div className="about__right">
        <p className="about__bio reveal" style={{ transitionDelay: '0.1s' }}>
          {data.about.bio}
        </p>

        <div className="about__stats reveal" style={{ transitionDelay: '0.24s' }}>
          {data.about.stats.map((s) => (
            <AnimatedStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        {/* Portrait placeholder */}
        <div className="about__image reveal" style={{ transitionDelay: '0.38s' }}>
          <div className="about__image-frame">
            <div className="about__image-placeholder">
              <span>Your photo</span>
            </div>
          </div>
        </div>

        <a href={data.about.resumeUrl} className="about__resume reveal" data-cursor style={{ transitionDelay: '0.5s' }}>
          View resume →
        </a>
      </div>
    </section>
  )
}
