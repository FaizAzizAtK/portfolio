import { useEffect, useRef, useState } from 'react'
import { data } from '../data'
import { SquiggleUnderline, HandAsterisk, ScribbleStar, WigglyArrow } from './Icons'
import './Contact.css'

export default function Contact() {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 180)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(data.contact.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <section className="contact" id="contact" ref={ref}>

      {/* Floating doodles */}
      <HandAsterisk size={26} color="var(--accent)"   className="contact__doodle contact__doodle--a" />
      <ScribbleStar size={20} color="var(--accent-2)" className="contact__doodle contact__doodle--b" />

      <div className="contact__inner">
        <div className="contact__tag reveal">
          <span className="section-tag">/ Contact</span>
        </div>

        <h2 className="contact__heading reveal" style={{ transitionDelay: '0.12s' }}>
          {data.contact.cta}
          <span className="contact__heading-accent">
            <em>{data.contact.ctaAccent}</em>
            <SquiggleUnderline width={380} color="var(--accent)" className="contact__heading-squiggle" />
          </span>
        </h2>

        <p className="contact__avail reveal" style={{ transitionDelay: '0.26s' }}>
          ✦ {data.contact.availability}
        </p>

        {/* Email */}
        <button
          className={`contact__email reveal ${copied ? 'contact__email--copied' : ''}`}
          style={{ transitionDelay: '0.4s' }}
          onClick={copyEmail}
          data-cursor
        >
          <span className="contact__email-text">
            {copied ? 'Copied!' : data.contact.email}
          </span>
          <WigglyArrow size={48} color="var(--accent)" className="contact__email-arrow" />
          <span className="contact__email-hint">
            {copied ? '✓ done' : 'click to copy'}
          </span>
        </button>

        {/* Socials */}
        <div className="contact__socials reveal" style={{ transitionDelay: '0.54s' }}>
          {data.contact.socials.map((s, i) => (
            <span key={s.label} className="contact__social-item">
              {i > 0 && <span className="contact__sep" aria-hidden="true">·</span>}
              <a href={s.url} className="contact__social" data-cursor target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      <footer className="contact__footer">
        <p className="contact__copy">© {new Date().getFullYear()} {data.name}</p>
        <p className="contact__made">Made with a lot of ✦ intention</p>
      </footer>
    </section>
  )
}
