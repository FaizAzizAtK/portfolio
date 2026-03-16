import { useEffect, useState, useRef } from 'react'
import { data } from '../data'
import './Nav.css'

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 80)
      setScrolled(y > 60)
      lastY = y
      // Close menu on scroll
      if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = data.nav.links.map(l => document.getElementById(l.toLowerCase())).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const fonts = [
    'Syne',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Impact',
    'Comic Sans MS',
    'Brush Script MT',
    'Lucida Console',
    'Palatino',
    'Garamond'
  ]

  const handleMouseEnter = () => {
    setIsHovering(true)
    intervalRef.current = setInterval(() => {
      const fChar = document.querySelector('.nav__logo-char-f')
      const aChar = document.querySelector('.nav__logo-char-a')

      if (fChar && aChar) {
        fChar.style.fontFamily = `'${fonts[Math.floor(Math.random() * fonts.length)]}'`
        aChar.style.fontFamily = `'${fonts[Math.floor(Math.random() * fonts.length)]}'`
      }
    }, 150)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const fChar = document.querySelector('.nav__logo-char-f')
    const aChar = document.querySelector('.nav__logo-char-a')

    if (fChar && aChar) {
      fChar.style.fontFamily = 'var(--font-display)'
      aChar.style.fontFamily = 'var(--font-display)'
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const scrollTo = (id) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  const handleMobileNav = (link) => {
    setMenuOpen(false)
    setTimeout(() => scrollTo(link), 300)
  }

  return (
    <>
      <nav className={`nav ${visible ? '' : 'nav--hidden'} ${scrolled ? 'nav--scrolled' : ''}`}>
        <button
          className="nav__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Faiz Aziz — home"
        >
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <filter id="gooey-refined">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
                  result="gooey"
                />
                <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
              </filter>
            </defs>
          </svg>
          <div className="nav__logo-liquid">
            <span className="nav__logo-char nav__logo-char-f">F</span>
            <span className="nav__logo-char nav__logo-char-a">A</span>
          </div>
        </button>

        {/* Desktop links */}
        <div className="nav__right">
          <ul className="nav__links">
            {data.nav.links.map((link) => (
              <li key={link}>
                <a
                  className={`nav__link${activeSection === link.toLowerCase() ? ' nav__link--active' : ''}`}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link) }}
                >{link}</a>
              </li>
            ))}
          </ul>
          <a
            href="https://www.linkedin.com/in/faiz-aziz-01524425a/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__linkedin"
            aria-label="LinkedIn profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="nav__burger-line" />
          <span className="nav__burger-line" />
          <span className="nav__burger-line" />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`nav__mobile-menu ${menuOpen ? 'nav__mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="nav__mobile-links">
          {data.nav.links.map((link, i) => (
            <li key={link} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
              <a
                className="nav__mobile-link"
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); handleMobileNav(link) }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://www.linkedin.com/in/faiz-aziz-01524425a/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav__mobile-linkedin"
          style={{ transitionDelay: menuOpen ? `${data.nav.links.length * 60}ms` : '0ms' }}
        >
          LinkedIn
        </a>
      </div>
    </>
  )
}
