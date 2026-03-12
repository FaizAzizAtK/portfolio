import './index.css'
import Cursor  from './components/Cursor'
import Nav     from './components/Nav'
import Hero    from './components/Hero'
import About   from './components/About'
import Work    from './components/Work'
import Skills  from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
