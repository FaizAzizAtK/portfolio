import { useEffect, useRef } from 'react'
import { data } from '../data'
import { WigglyArrow, HandCircle, WavyLine } from './Icons'
import './About.css'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left').forEach((el, i) => {
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
        {/* Left: big stat in a hand-drawn box */}
        <div className="about__left reveal-left">
          <div className="about__stat-box">
            <HandCircle size={160} color="var(--accent)" className="about__stat-circle" />
            <div className="about__stat-inner">
              <span className="about__stat">{data.about.stat}</span>
              <span className="about__stat-label">{data.about.statLabel}</span>
            </div>
          </div>
          <WavyLine width={80} color="var(--accent)" className="about__divider" />
        </div>

        {/* Right: bio */}
        <div className="about__right">
          <p className="about__bio reveal" style={{ transitionDelay: '0.1s' }}>
            {data.about.bio}
          </p>
          <p className="about__bio about__bio--muted reveal" style={{ transitionDelay: '0.22s' }}>
            {data.about.secondaryBio}
          </p>
          <div className="about__links reveal" style={{ transitionDelay: '0.36s' }}>
            <a href={data.about.resumeUrl} className="about__link" data-cursor>
              View Resume
              <WigglyArrow size={44} color="var(--accent)" className="about__link-arrow" />
            </a>
            <a href="#contact" className="about__link" data-cursor>
              Work Together
              <WigglyArrow size={44} color="var(--accent)" className="about__link-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
