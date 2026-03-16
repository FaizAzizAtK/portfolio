import { useState } from 'react'
import './index.css'
import Cursor               from './components/Cursor'
import Nav                  from './components/Nav'
import Hero                 from './components/Hero'
import About                from './components/About'
import Experience           from './components/Experience'
import Work                 from './components/Work'
import Skills               from './components/Skills'
import Contact              from './components/Contact'
import BlogOverlay          from './components/BlogOverlay'

export default function App() {
  const [activeBlog, setActiveBlog] = useState(null)

  return (
    <>
      <Cursor />
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Work onOpenBlog={setActiveBlog} />
        <Skills />
        <Contact />
      </main>
      {activeBlog && (
        <BlogOverlay blogId={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  )
}
