import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import AIAssistant from './components/AIAssistant' // ADD THIS LINE

const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Experience = lazy(() => import('./sections/Experience'))
const Projects = lazy(() => import('./sections/Projects'))
const Achievements = lazy(() => import('./sections/Achievements'))
const Services = lazy(() => import('./sections/Services'))
const TechStack = lazy(() => import('./sections/TechStack'))
const Testimonials = lazy(() => import('./sections/Testimonials'))
const YouTube = lazy(() => import('./sections/YouTube'))
const Contact = lazy(() => import('./sections/Contact'))

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Services />
      <TechStack />
      <Testimonials />
      <YouTube />
      <Contact />
    </>
  )
}

function App() {
  return (
    <div className="relative min-h-screen bg-deep-black text-white overflow-x-hidden">
      <CustomCursor />
      <LoadingScreen />
      <ScrollToTop />
      <Navbar />
      <AIAssistant /> {/* ADD THIS LINE - AI Chatbot */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App