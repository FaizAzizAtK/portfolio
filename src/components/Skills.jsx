import { useEffect, useRef } from 'react'
import { data } from '../data'
import './Skills.css'

const COLUMNS = [
  { key: 'design', label: 'Design' },
  { key: 'development', label: 'Development' },
  { key: 'tools', label: 'Tools' },
]

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 120)
          })
          entry.target.querySelectorAll('.skill-item').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), 400 + i * 45)
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
    <section className="skills" id="skills" ref={ref}>
      <div className="skills__inner">
        {/* Left: label + heading */}
        <div className="skills__left">
          <div className="section-label reveal">
            <span className="section-num">04</span>
            <span className="section-name">Skills</span>
          </div>
          <h2 className="skills__heading reveal">
            What I<br />bring
          </h2>
        </div>

        {/* Right: 3-column skill lists */}
        <div className="skills__grid reveal" style={{ transitionDelay: '0.2s' }}>
          {COLUMNS.map((col) => (
            <div key={col.key} className="skills__col">
              <p className="skills__col-label">{col.label}</p>
              <ul className="skills__list">
                {data.skills[col.key].map((skill, i) => (
                  <li key={skill} className="skill-item" style={{ transitionDelay: `${i * 0.04}s` }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
