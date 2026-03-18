import { useEffect, useRef, useState } from 'react'
import { data } from '../data'
import CardVisual from './CardVisual'
import './Work.css'

export default function Work({ onOpenBlog }) {
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
    // Cache driver offset to avoid getBoundingClientRect in scroll handler
    let driverTop    = 0
    let scrollableH  = 0

    const recalc = () => {
      if (window.innerWidth <= 900) {
        driver.style.height = ''
        track.style.transform = ''
        scrollableH = 0
        return
      }
      const maxT = Math.max(0, track.scrollWidth - sticky.offsetWidth)
      driver.style.height = `${sticky.offsetHeight + maxT + exitBuffer}px`
      driverTop   = driver.getBoundingClientRect().top + window.scrollY
      scrollableH = driver.offsetHeight - sticky.offsetHeight
    }

    recalc()

    const onScroll = () => {
      if (scrollableH <= 0) return
      const progress = Math.max(0, Math.min(1, (window.scrollY - driverTop) / scrollableH))
      const maxT = Math.max(0, track.scrollWidth - sticky.offsetWidth)
      track.style.transform = maxT > 0 ? `translateX(-${progress * maxT}px)` : ''

      setActiveCard(Math.min(data.work.length - 1, Math.floor(progress * data.work.length)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', recalc)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', recalc)
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
    <section className="work" id="writing">
      <div className="work__scroll-driver" ref={driverRef}>
        <div className="work__sticky" ref={stickyRef}>

          <div className="work__header" ref={headerRef}>
            <div className="section-label reveal">
              <span className="section-num">03</span>
              <span className="section-name">Writing</span>
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
              {data.work.map((project) => {
                const hasLink = project.url && project.url !== '#'
                const hasBlog = project.type === 'article' && project.blogId
                const Tag = hasLink ? 'a' : 'div'
                const linkProps = hasLink
                  ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
                  : {}
                const clickProps = hasBlog
                  ? { onClick: () => onOpenBlog?.(project.blogId), role: 'button', tabIndex: 0 }
                  : {}
                return (
                <Tag key={project.id} {...linkProps} {...clickProps} className={`work__card${(!hasLink && !hasBlog) ? ' work__card--no-link' : ''}`} data-cursor>
                  <div className="work__card-img">
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : project.blogId ? (
                      <CardVisual blogId={project.blogId} />
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
                    {(hasLink || hasBlog) && (
                      <span className="work__card-link">
                        {hasBlog ? 'Read essay' : 'View project'}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                </Tag>
                )
              })}
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
