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
          <span className="section-num section-num--inv">05</span>
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
          aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
        >
          <span className="contact__email-text">
            {copied ? 'Copied to clipboard' : data.contact.email}
          </span>
          <svg className="contact__email-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* LinkedIn — featured */}
        <a
          href="https://www.linkedin.com/in/faiz-aziz-01524425a/"
          className="contact__linkedin reveal"
          data-cursor
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
        >
          <span className="contact__linkedin-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </span>
          <span className="contact__linkedin-text">Connect on LinkedIn</span>
          <svg className="contact__linkedin-arrow" width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Other socials */}
        <div className="contact__socials reveal">
          {data.contact.socials.filter(s => s.label !== 'LinkedIn').map((s) => (
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
        <p className="contact__copy" suppressHydrationWarning>© {new Date().getFullYear()} {data.name}</p>
        <p className="contact__made">Designed & built with intention</p>
      </footer>
    </section>
  )
}
