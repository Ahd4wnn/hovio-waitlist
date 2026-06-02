import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect } from 'react'
import { initLenis } from './lib/lenis'
import { AnimatePresence, motion } from 'motion/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemStrip from './components/ProblemStrip'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import PrivacyStrip from './components/PrivacyStrip'
import MarqueeCarousel from './components/MarqueeCarousel'
import Footer from './components/Footer'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import NotFoundPage from './pages/NotFoundPage'

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Navbar />
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <Features />
      <PrivacyStrip />
      <MarqueeCarousel />
      <Footer />
    </motion.div>
  )
}

function AnimatedAppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blog"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <BlogIndexPage />
            </motion.div>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <BlogPostPage />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <NotFoundPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    initLenis()
  }, [])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimatedAppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}
