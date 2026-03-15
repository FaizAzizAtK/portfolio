import { useEffect, useState, useRef } from 'react'
import { data } from '../data'
import './Nav.css'

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 80)
      setScrolled(y > 60)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  return (
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
      <ul className="nav__links">
        {data.nav.links.map((link) => (
          <li key={link}>
            <button className="nav__link" onClick={() => scrollTo(link)}>{link}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
