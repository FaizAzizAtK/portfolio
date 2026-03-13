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
            setTimeout(() => el.classList.add('revealed'), i * 160)
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
      <div className="contact__inner">
        {/* Section label */}
        <div className="section-label reveal">
          <span className="section-num section-num--inv">04</span>
          <span className="section-name section-name--inv">Contact</span>
        </div>

        {/* Big CTA heading */}
        <h2 className="contact__heading reveal">
          {data.contact.heading}
        </h2>

        {/* Availability badge */}
        <p className="contact__avail reveal">
          <span className="contact__avail-dot" />
          {data.contact.availability}
        </p>

        {/* Email — click to copy */}
        <button
          className={`contact__email reveal ${copied ? 'contact__email--copied' : ''}`}
          onClick={copyEmail}
          data-cursor
        >
          <span className="contact__email-text">
            {copied ? 'Copied to clipboard' : data.contact.email}
          </span>
          <svg className="contact__email-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Socials */}
        <div className="contact__socials reveal">
          {data.contact.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              className="contact__social"
              data-cursor
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <footer className="contact__footer">
        <p className="contact__copy">© {new Date().getFullYear()} {data.name}</p>
        <p className="contact__made">Designed & built with intention</p>
      </footer>
    </section>
  )
}
