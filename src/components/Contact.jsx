import { useEffect, useRef, useState } from 'react'
import { data } from '../data'
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
      {/* Ambient glow */}
      <div className="contact__glow" aria-hidden="true" />

      <div className="contact__inner">
        <div className="contact__tag reveal">
          <span className="section-tag">/ Contact</span>
        </div>

        <h2 className="contact__heading reveal" style={{ transitionDelay: '0.12s' }}>
          {data.contact.cta}<br />
          <em>{data.contact.ctaAccent}</em>
        </h2>

        <p className="contact__avail reveal" style={{ transitionDelay: '0.26s' }}>
          {data.contact.availability}
        </p>

        {/* Email CTA */}
        <button
          className={`contact__email ${copied ? 'contact__email--copied' : ''}`}
          onClick={copyEmail}
          data-cursor
          aria-label="Copy email address"
          style={{ transitionDelay: '0.4s' }}
        >
          <span className="contact__email-text">
            {copied ? 'Copied to clipboard!' : data.contact.email}
          </span>
          <span className="contact__email-hint">
            {copied ? '✓' : 'Click to copy'}
          </span>
          <span className="contact__email-fill" aria-hidden="true" />
        </button>

        {/* Socials */}
        <div className="contact__socials reveal" style={{ transitionDelay: '0.54s' }}>
          {data.contact.socials.map((s, i) => (
            <span key={s.label} className="contact__social-item">
              {i > 0 && <span className="contact__social-sep" aria-hidden="true" />}
              <a href={s.url} className="contact__social" data-cursor target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="contact__footer">
        <p className="contact__copy">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        <p className="contact__made">Made with intention.</p>
      </footer>
    </section>
  )
}
