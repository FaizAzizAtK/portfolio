import { useEffect, useRef } from 'react'
import { data } from '../data'
import DotPhoto from './DotPhoto'
import './About.css'

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

      {/* Section label — own grid item so it can be ordered above portrait on mobile */}
      <div className="about__label-wrap reveal">
        <div className="section-label">
          <span className="section-num">01</span>
          <span className="section-name">About</span>
        </div>
      </div>

      {/* Col 1 — bio + capabilities */}
      <div className="about__main">
        <p className="about__bio reveal" style={{ transitionDelay: '0.12s' }}>
          {data.about.bio}
        </p>

        {data.about.resumeUrl !== '#' && (
          <a href={data.about.resumeUrl} className="about__resume reveal" data-cursor style={{ transitionDelay: '0.38s' }}>
            View resume →
          </a>
        )}
      </div>

      {/* Col 2 — reactive portrait */}
      <div className="about__portrait reveal" style={{ transitionDelay: '0.2s' }}>
        <div className="about__portrait-circle">
          <DotPhoto
            src={`${import.meta.env.BASE_URL}photo.png`}
            gridSize={3}
            satBoost={0}
            smoothing={1.5}
            colored={false}
            square={true}
            focalY={0.51}
            shiftX={-22}
            intro={true}
            className="about__dot-photo"
          />
        </div>
      </div>

    </section>
  )
}
