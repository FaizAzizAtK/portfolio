import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const CARDS = [
  {
    rank: 'J',
    suit: '♣',
    category: 'Win',
    theme: 'black',
    skills: [
      'Technical Pre-sales',
      'Business Case Development',
      'Discovery Workshops',
      'AI Readiness Assessment',
      'POC Design',
    ],
  },
  {
    rank: 'Q',
    suit: '♠',
    category: 'Think',
    theme: 'white',
    skills: [
      'Enterprise Architecture',
      'Solution Design',
      'Stakeholder Management',
      'Agile Delivery',
    ],
  },
  {
    rank: 'K',
    suit: '♥',
    category: 'Build',
    theme: 'charcoal',
    skills: [
      'Python',
      'Multi-agent Systems',
      'RAG',
      'Context Engineering',
      'LangChain',
      'MCPs',
    ],
  },
  {
    rank: 'A',
    suit: '♦',
    category: 'Ship',
    theme: 'silver',
    skills: [
      'Tech-stack agnostic',
      'Client-embedded delivery',
      'End-to-end AI systems',
      'Production governance',
      'Observability & Evals',
    ],
  },
]

export default function Skills() {
  const ref     = useRef(null)
  const [entered, setEntered] = useState([])

  useEffect(() => {
    let fired = false
    const trigger = () => {
      if (fired) return
      fired = true
      if (ref.current) {
        ref.current.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 130)
        })
      }
      CARDS.forEach((_, i) => {
        setTimeout(() => setEntered(prev => [...prev, i]), 220 + i * 120)
      })
      observer.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger() },
      { threshold: 0, rootMargin: '0px 0px 200px 0px' }
    )
    if (ref.current) observer.observe(ref.current)

    // Fallback: fire after 3 s in case observer never triggers (e.g. iOS Safari)
    const fallback = setTimeout(trigger, 3000)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="skills__inner">

        <div className="skills__left">
          <div className="section-label reveal">
            <span className="section-num">04</span>
            <span className="section-name">Skills</span>
          </div>
          <h2 className="skills__heading reveal">
            What I bring
          </h2>
        </div>

        <div className="skills__deck" role="list">
          {CARDS.map((card, i) => (
            <article
              key={card.category}
              role="listitem"
              className={[
                'skills__card',
                `skills__card--${card.theme}`,
                `skills__card--r${i}`,
                entered.includes(i) ? 'skills__card--in' : '',
              ].join(' ')}
              aria-label={`${card.category}: ${card.skills.join(', ')}`}
            >
              {/* Top-left corner index */}
              <div className="card__corner card__corner--tl" aria-hidden="true">
                <span className="card__rank">{card.rank}</span>
                <span className="card__suit-pip">{card.suit}</span>
              </div>

              {/* Watermark suit — top-right */}
              <span className="card__suit-bg" aria-hidden="true">{card.suit}</span>

              {/* Body */}
              <div className="card__body">
                <h3 className="card__category">{card.category}</h3>
                <div className="card__rule" aria-hidden="true" />

                <ul className="card__skills" role="list">
                  {card.skills.map(skill => (
                    <li key={skill} className="card__skill">{skill}</li>
                  ))}
                </ul>
              </div>

              {/* Bottom-right corner index */}
              <div className="card__corner card__corner--br" aria-hidden="true">
                <span className="card__rank">{card.rank}</span>
                <span className="card__suit-pip">{card.suit}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
