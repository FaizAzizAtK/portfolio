import { useEffect, useRef } from 'react'
import { data } from '../data'
import { SquiggleUnderline, ScribbleStar, WigglyArrow } from './Icons'
import './Work.css'

function ProjectCard({ project, index }) {
  return (
    <a
      href={project.url}
      className="project-card reveal"
      style={{ transitionDelay: `${index * 0.13}s` }}
      data-cursor
    >
      {/* Sketch-style number badge */}
      <div className="project-card__badge">
        <ScribbleStar size={48} color="var(--accent)" className="project-card__badge-star" />
        <span className="project-card__num">{project.id}</span>
      </div>

      <div className="project-card__body">
        <p className="project-card__cat">{project.category}</p>
        <h3 className="project-card__title">
          {project.title}
          <span className="project-card__underline">
            <SquiggleUnderline width={180} color="var(--accent)" />
          </span>
        </h3>
        <p className="project-card__desc">{project.description}</p>
      </div>

      <footer className="project-card__foot">
        <span className="project-card__year">{project.year}</span>
        <span className="project-card__cta">
          View project
          <WigglyArrow size={40} color="var(--accent)" className="project-card__arrow" />
        </span>
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
        <h2 className="work__heading">
          Things I've<br />
          <em>made</em> ✦
        </h2>
      </div>

      <div className="work__grid">
        {data.work.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <div className="work__more reveal">
        <a href="#" className="work__more-link" data-cursor>
          See everything I've worked on
          <WigglyArrow size={50} color="var(--accent)" />
        </a>
      </div>
    </section>
  )
}
