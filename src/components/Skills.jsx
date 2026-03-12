import { useEffect, useRef } from 'react'
import { data } from '../data'
import './Skills.css'

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Heading reveals first
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 150)
          })
          // Tags stagger after a short offset
          entry.target.querySelectorAll('.skill-tag').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), 300 + i * 55)
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
    <section className="skills" id="skills" ref={ref}>
      <div className="skills__label reveal">
        <span className="section-tag">/ Skills</span>
      </div>

      <h2 className="skills__heading reveal" style={{ transitionDelay: '0.1s' }}>
        What I bring<br />
        <em>to the table</em>
      </h2>

      <div className="skills__tags">
        {data.skills.map((skill) => (
          <span key={skill} className="skill-tag" data-cursor>
            {skill}
          </span>
        ))}
      </div>

      <span className="skills__watermark" aria-hidden="true">Skills</span>
    </section>
  )
}
