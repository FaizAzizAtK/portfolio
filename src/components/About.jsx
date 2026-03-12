import { useEffect, useRef } from 'react'
import { data } from '../data'
import './About.css'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 130)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__label reveal">
        <span className="section-tag">/ About</span>
      </div>

      <div className="about__grid">
        {/* Left col — big stat */}
        <div className="about__left">
          <div className="about__stat reveal-left">{data.about.stat}</div>
          <div className="about__stat-label reveal-left" style={{ transitionDelay: '0.1s' }}>
            {data.about.statLabel}
          </div>
          <div className="about__divider reveal-left" style={{ transitionDelay: '0.2s' }} />
        </div>

        {/* Right col — bio */}
        <div className="about__right">
          <p className="about__bio reveal" style={{ transitionDelay: '0.15s' }}>
            {data.about.bio}
          </p>
          <p className="about__bio about__bio--dim reveal" style={{ transitionDelay: '0.28s' }}>
            {data.about.secondaryBio}
          </p>
          <div className="about__links reveal" style={{ transitionDelay: '0.42s' }}>
            <a href={data.about.resumeUrl} className="about__link" data-cursor>
              View Resume <span className="about__link-arrow">↗</span>
            </a>
            <a href="#contact" className="about__link" data-cursor>
              Work Together <span className="about__link-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative watermark */}
      <span className="about__watermark" aria-hidden="true">About</span>
    </section>
  )
}
