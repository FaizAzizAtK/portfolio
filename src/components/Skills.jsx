import { useEffect, useRef } from 'react'
import { data } from '../data'
import { HandBracket, SquiggleUnderline } from './Icons'
import './Skills.css'

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 150)
          })
          entry.target.querySelectorAll('.skill-tag').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), 350 + i * 55)
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
        What I bring
        <span className="skills__heading-line">
          <em>to the table</em>
          <SquiggleUnderline width={300} color="var(--accent)" className="skills__heading-squiggle" />
        </span>
      </h2>

      <div className="skills__cloud">
        <HandBracket height={200} color="var(--border-dark)" className="skills__bracket skills__bracket--left" />
        <div className="skills__tags">
          {data.skills.map((skill) => (
            <span key={skill} className="skill-tag" data-cursor>
              {skill}
            </span>
          ))}
        </div>
        <HandBracket height={200} color="var(--border-dark)" flip className="skills__bracket skills__bracket--right" />
      </div>
    </section>
  )
}
