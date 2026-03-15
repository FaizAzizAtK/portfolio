import { useEffect, useRef } from 'react'
import { data } from '../data'
import Sphere from './Sphere'
import './Hero.css'

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

export default function Hero() {
  const intervalRef = useRef(null)
  const settledIndices = useRef(new Set())

  useEffect(() => {
    const letters = document.querySelectorAll('.glitch-letter')
    const settleOrder = [0, 1, 2, 3, 4, 5, 6, 7] // F-a-i-z-A-z-i-z
    let settleIndex = 0
    const startTime = Date.now()
    const scrambleDuration = 1500 // Scramble for 1.5s before settling starts
    const settleDelay = 150 // Delay between each letter settling

    // Start scrambling all letters
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime

      letters.forEach((letter, index) => {
        // If this letter hasn't settled yet
        if (!settledIndices.current.has(index)) {
          const randomFont = fonts[Math.floor(Math.random() * fonts.length)]
          letter.style.fontFamily = `'${randomFont}'`
        }
      })

      // Start settling letters sequentially after scramble duration
      if (elapsed > scrambleDuration) {
        const timeSinceSettleStart = elapsed - scrambleDuration
        const shouldSettleCount = Math.floor(timeSinceSettleStart / settleDelay) + 1

        // Settle letters one by one
        while (settleIndex < shouldSettleCount && settleIndex < settleOrder.length) {
          const letterIndex = settleOrder[settleIndex]
          settledIndices.current.add(letterIndex)
          letters[letterIndex].style.fontFamily = 'var(--font-display)'
          settleIndex++
        }

        // Stop when all letters are settled
        if (settledIndices.current.size === letters.length) {
          clearInterval(intervalRef.current)
        }
      }
    }, 80)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const scrollDown = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <div className="hero__content">
        {/* Left: name + subtitle */}
        <div className="hero__text">
          <h1 className="hero__name">
            <span className="clip-reveal" style={{ animationDelay: '0.2s' }}>
              <span>
                <span className="glitch-letter">F</span>
                <span className="glitch-letter">a</span>
                <span className="glitch-letter">i</span>
                <span className="glitch-letter">z</span>
              </span>
            </span>
            <span className="clip-reveal" style={{ animationDelay: '0.38s' }}>
              <span>
                <span className="glitch-letter">A</span>
                <span className="glitch-letter">z</span>
                <span className="glitch-letter">i</span>
                <span className="glitch-letter">z</span>
              </span>
            </span>
          </h1>

          <p className="hero__intro">
            I ship agentic AI that works after the demo ends. Consistent, reliable, and scalable, across real automation, tooling, and customer-facing products.
          </p>
        </div>

        {/* Right: 3D skill sphere */}
        <Sphere />
      </div>

      {/* Bottom bar */}
      <div className="hero__bottom">
        <p className="hero__loc">{data.location}</p>
        <button className="hero__scroll" onClick={scrollDown} data-cursor>
          <span className="hero__scroll-text">{data.hero.scrollLabel}</span>
          <span className="hero__scroll-arrow">↓</span>
        </button>
      </div>
    </section>
  )
}
