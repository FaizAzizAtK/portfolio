import './index.css'
import Cursor        from './components/Cursor'
import FloatingOrbs  from './components/FloatingOrbs'
import Nav           from './components/Nav'
import Hero          from './components/Hero'
import About         from './components/About'
import Experience    from './components/Experience'
import Work          from './components/Work'
import Skills        from './components/Skills'
import Contact       from './components/Contact'

export default function App() {
  return (
    <>
      <FloatingOrbs />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
