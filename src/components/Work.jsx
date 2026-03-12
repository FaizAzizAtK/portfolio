import { useEffect, useRef } from 'react'
import { data } from '../data'
import './Work.css'

function ProjectCard({ project, index }) {
  return (
    <a
      href={project.url}
      className="project-card reveal"
      style={{ transitionDelay: `${index * 0.14}s` }}
      data-cursor
    >
      {/* Coloured wash on hover */}
      <span className="project-card__wash" style={{ '--wash': project.color }} />

      <header className="project-card__head">
        <span className="project-card__num">{project.id}</span>
        <span className="project-card__year">{project.year}</span>
      </header>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__cat">{project.category}</p>
        <p className="project-card__desc">{project.description}</p>
      </div>

      <footer className="project-card__foot">
        <span className="project-card__cta">View project</span>
        <span className="project-card__arrow" aria-hidden="true">↗</span>
      </footer>
    </a>
  )
}

export default function Work() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 130)
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
    <section className="work" id="work" ref={ref}>
      <div className="work__header reveal">
        <span className="section-tag">/ Work</span>
        <h2 className="work__heading">Selected<br /><em>Projects</em></h2>
      </div>

      <div className="work__grid">
        {data.work.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <div className="work__more reveal">
        <a href="#" className="work__more-link" data-cursor>
          View all projects
          <span className="work__more-track">
            <span className="work__more-fill" />
          </span>
        </a>
      </div>
    </section>
  )
}
