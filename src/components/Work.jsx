import { useEffect, useRef, useState } from 'react'
import { data } from '../data'
import './Work.css'

export default function Work() {
  const driverRef   = useRef(null)
  const stickyRef   = useRef(null)
  const trackRef    = useRef(null)
  const headerRef   = useRef(null)
  const progressRef = useRef(null)
  const [activeCard, setActiveCard] = useState(0)

  // Dynamic driver height + horizontal scroll
  useEffect(() => {
    const driver = driverRef.current
    const sticky = stickyRef.current
    const track  = trackRef.current
    if (!driver || !sticky || !track) return

    const exitBuffer = 500 // px of smooth scroll after last card lands
    const setDriverHeight = () => {
      const maxT = track.scrollWidth - sticky.offsetWidth
      driver.style.height = `${sticky.offsetHeight + Math.max(0, maxT) + exitBuffer}px`
    }

    setDriverHeight()

    const onScroll = () => {
      const rect = sticky.getBoundingClientRect()
      const scrollableH = driver.offsetHeight - sticky.offsetHeight
      if (scrollableH <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableH))
      const maxT = track.scrollWidth - sticky.offsetWidth
      track.style.transform = `translateX(-${progress * maxT}px)`

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }

      setActiveCard(Math.min(data.work.length - 1, Math.floor(progress * data.work.length)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', setDriverHeight)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', setDriverHeight)
    }
  }, [])

  // Reveal header
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            setTimeout(() => node.classList.add('revealed'), i * 120)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="work" id="work">
      <div className="work__scroll-driver" ref={driverRef}>
        <div className="work__sticky" ref={stickyRef}>

          <div className="work__header" ref={headerRef}>
            <div className="section-label reveal">
              <span className="section-num">03</span>
              <span className="section-name">Work</span>
            </div>

            <div className="work__counter reveal">
              <span className="work__counter-current">
                {String(activeCard + 1).padStart(2, '0')}
              </span>
              <span className="work__counter-sep">/</span>
              <span className="work__counter-total">
                {String(data.work.length).padStart(2, '0')}
              </span>
            </div>

            <p className="work__scroll-hint reveal">
              <span>Scroll to explore</span>
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" aria-hidden="true">
                <path d="M0 6h38M32 1l6 5-6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </p>
          </div>

          <div className="work__track-wrap">
            <div className="work__track" ref={trackRef}>
              {data.work.map((project) => (
                <a key={project.id} href={project.url} className="work__card" data-cursor>
                  <div className="work__card-img">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <div className="work__card-placeholder">
                        <span>{project.id}</span>
                      </div>
                    )}
                  </div>
                  <div className="work__card-meta">
                    <div className="work__card-top">
                      <span className="work__card-cat">{project.category}</span>
                      <span className="work__card-year">{project.year}</span>
                    </div>
                    <h3 className="work__card-title">{project.title}</h3>
                    {project.status && (
                      <span className="work__card-status">{project.status}</span>
                    )}
                    <p className="work__card-desc">{project.description}</p>
                    <span className="work__card-link">
                      {project.status ? 'In progress' : 'View project'}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="work__progress-track">
            <div className="work__progress-bar" ref={progressRef} />
          </div>

        </div>
      </div>
    </section>
  )
}
