import { useEffect, useRef } from 'react'
import { data } from '../data'
import './Work.css'

export default function Work() {
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const headerRef = useRef(null)

  // Horizontal scroll driven by vertical scroll position
  useEffect(() => {
    const sticky = stickyRef.current
    const track = trackRef.current
    if (!sticky || !track) return

    const onScroll = () => {
      const rect = sticky.getBoundingClientRect()
      const stickyH = sticky.offsetHeight
      const scrollableH = sticky.parentElement.offsetHeight - stickyH
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableH))
      const maxTranslate = track.scrollWidth - track.offsetWidth
      track.style.transform = `translateX(-${progress * maxTranslate}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
      {/* Tall scroll container that drives horizontal movement */}
      <div className="work__scroll-driver">
        <div className="work__sticky" ref={stickyRef}>

          {/* Header */}
          <div className="work__header" ref={headerRef}>
            <div className="section-label reveal">
              <span className="section-num">02</span>
              <span className="section-name">Work</span>
            </div>
            <p className="work__scroll-hint reveal">
              <span>Scroll to explore</span>
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" aria-hidden="true">
                <path d="M0 6h38M32 1l6 5-6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </p>
          </div>

          {/* Horizontal track */}
          <div className="work__track-wrap">
            <div className="work__track" ref={trackRef}>
              {data.work.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  className="work__card"
                  data-cursor
                >
                  {/* Image / placeholder */}
                  <div className="work__card-img">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <div className="work__card-placeholder">
                        <span>{project.id}</span>
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="work__card-meta">
                    <div className="work__card-top">
                      <span className="work__card-cat">{project.category}</span>
                      <span className="work__card-year">{project.year}</span>
                    </div>
                    <h3 className="work__card-title">{project.title}</h3>
                    <p className="work__card-desc">{project.description}</p>
                    <span className="work__card-link">
                      View project
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
