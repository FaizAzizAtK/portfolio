import { useEffect, useRef, useState } from 'react'
import { data } from '../data'
import './Skills.css'

const CATEGORIES = [
  { key: 'delivery',    label: 'Delivery' },
  { key: 'development', label: 'Development' },
  { key: 'tools',       label: 'AI Tools' },
]

export default function Skills() {
  const ref = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 120)
          })
          setTimeout(() => setRevealed(true), 300)
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

        {/* Right: interactive chip map */}
        <div className="skills__map reveal" style={{ transitionDelay: '0.15s' }}>
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.key} className="skills__track">
              <div className="skills__track-header">
                <span className="skills__track-dot" />
                <span className="skills__track-label">{cat.label}</span>
              </div>
              <div className="skills__track-chips">
                {data.skills[cat.key].map((skill, i) => (
                  <button
                    key={skill}
                    className={`skills__chip ${revealed ? 'skills__chip--in' : ''} ${hoveredSkill === skill ? 'skills__chip--active' : ''}`}
                    style={{ transitionDelay: revealed ? `${ci * 0.12 + i * 0.05}s` : '0s' }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    tabIndex={0}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
