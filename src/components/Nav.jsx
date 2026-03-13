import { useEffect, useState } from 'react'
import { data } from '../data'
import './Nav.css'

export default function Nav() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)

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

  const scrollTo = (id) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className={`nav ${visible ? '' : 'nav--hidden'} ${scrolled ? 'nav--scrolled' : ''}`}>
      <button
        className="nav__logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {data.name}
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
