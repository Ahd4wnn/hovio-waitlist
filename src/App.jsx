import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect } from 'react'
import { initLenis } from './lib/lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemStrip from './components/ProblemStrip'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import PrivacyStrip from './components/PrivacyStrip'
import MarqueeCarousel from './components/MarqueeCarousel'
import Footer from './components/Footer'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <Features />
      <PrivacyStrip />
      <MarqueeCarousel />
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    initLenis()
  }, [])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
