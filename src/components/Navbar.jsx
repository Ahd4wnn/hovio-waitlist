import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Listen for scroll events to toggle scroll state at 40px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToWaitlist = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.getElementById('hero-waitlist-form')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      const input = element.querySelector('input')
      if (input) input.focus()
    } else {
      window.location.href = '/#join'
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-[16px] backdrop-saturate-[1.8] border-b border-[#E4EAE4]/60 shadow-[0_2px_15px_rgba(0,0,0,0.01)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-width-container h-full flex items-center justify-between">
        
        {/* Left: Logo & Wordmark */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
            <img 
              src="/logo.jpg" 
              alt="Hovio Logo" 
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <span 
            className="text-[20px] font-normal tracking-tight text-green-primary lowercase"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            hovio
          </span>
        </a>

        {/* Right (Desktop): Links & Join Button */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#blog"
            onClick={(e) => e.preventDefault()}
            className="text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors font-body"
          >
            Blog
          </a>
          <motion.a
            href="#join"
            onClick={scrollToWaitlist}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-4 py-2 text-[14px] font-medium text-white bg-green-primary rounded-full shadow-sm hover:bg-[#154626] transition-colors font-body"
          >
            Join Waitlist
          </motion.a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden items-center justify-center w-8 h-8 text-text-primary focus:outline-none z-50 text-[24px]"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer Slide-down */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-16 left-0 right-0 bg-white/97 backdrop-blur-[20px] z-40 border-b border-border shadow-lg flex flex-col overflow-hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-6 font-body">
              <a
                href="#blog"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                }}
                className="text-base font-medium text-text-secondary hover:text-text-primary py-1.5 transition-colors border-b border-border/40"
              >
                Blog
              </a>
              <button
                onClick={scrollToWaitlist}
                className="w-full flex items-center justify-center py-3 text-[14px] font-medium text-white bg-green-primary rounded-xl hover:bg-[#154626] transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
