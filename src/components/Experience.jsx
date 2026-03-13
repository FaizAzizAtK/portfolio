import { useEffect, useRef } from 'react'
import { data } from '../data'
import './Experience.css'

export default function Experience() {
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
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="experience__inner">
        {/* Left: sticky label */}
        <div className="experience__left reveal">
          <div className="section-label">
            <span className="section-num">02</span>
            <span className="section-name">Experience</span>
          </div>
        </div>

        {/* Right: timeline */}
        <div className="experience__right">

          {/* Work entries */}
          <div className="exp__block reveal">
            <p className="exp__block-label">Work</p>
            <div className="exp__timeline">
              {data.experience.map((job) => (
                <div key={job.id} className="exp__entry">
                  <div className="exp__entry-line" aria-hidden="true">
                    <span className={`exp__dot ${job.current ? 'exp__dot--active' : ''}`} />
                  </div>
                  <div className="exp__entry-body">
                    <div className="exp__entry-head">
                      <h3 className="exp__company">{job.company}</h3>
                      <span className="exp__period">{job.period}</span>
                    </div>
                    <p className="exp__role">{job.role}</p>
                    <p className="exp__desc">{job.description}</p>
                    <div className="exp__tags">
                      {job.tags.map((t) => (
                        <span key={t} className="exp__tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education entries */}
          <div className="exp__block reveal">
            <p className="exp__block-label">Education</p>
            <div className="exp__timeline">
              {data.education.map((ed) => (
                <div key={ed.institution} className="exp__entry">
                  <div className="exp__entry-line" aria-hidden="true">
                    <span className="exp__dot" />
                  </div>
                  <div className="exp__entry-body">
                    <div className="exp__entry-head">
                      <h3 className="exp__company">{ed.institution}</h3>
                      <span className="exp__period">{ed.period}</span>
                    </div>
                    <p className="exp__role">{ed.degree}</p>
                    <p className="exp__desc">{ed.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
