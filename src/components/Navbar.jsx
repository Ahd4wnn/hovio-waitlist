import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Listen for scroll events to trigger sticky header blur state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
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
      // Focus the input
      const input = element.querySelector('input')
      if (input) input.focus()
    }
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
        borderBottomColor: isScrolled ? 'var(--border)' : 'transparent',
      }}
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b transition-all duration-300 backdrop-blur-md"
    >
      <div className="max-width-container h-full flex items-center justify-between">
        {/* Left: Branding & Custom Logo Image */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-[8px] shadow-sm border border-border">
            <img 
              src="/logo.jpg" 
              alt="Hovio Logo" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <span className="text-[21px] font-semibold tracking-tight text-[#1C5C32] lowercase">
            hovio
          </span>
        </a>

        {/* Right: Desktop Navigation links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#blog"
            onClick={(e) => e.preventDefault()}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Blog
          </a>
          <motion.a
            href="#join"
            onClick={scrollToWaitlist}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C5C32] rounded-full shadow-sm hover:bg-[#154626] transition-colors"
          >
            Join Waitlist
          </motion.a>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden flex-col items-center justify-center w-8 h-8 gap-[5px] text-text-primary focus:outline-none z-50"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-5 h-[2px] bg-text-primary rounded-full transition-transform duration-300 origin-center ${
              isMobileMenuOpen ? 'transform rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-text-primary rounded-full transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-text-primary rounded-full transition-transform duration-300 origin-center ${
              isMobileMenuOpen ? 'transform -rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 top-16 left-0 right-0 bottom-0 bg-white z-40 flex flex-col px-6 py-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <a
                href="#blog"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                }}
                className="text-lg font-medium text-text-secondary hover:text-text-primary py-2 border-b border-border transition-colors"
              >
                Blog
              </a>
              <button
                onClick={scrollToWaitlist}
                className="w-full flex items-center justify-center py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#1C5C32] rounded-xl hover:bg-[#154626] transition-colors"
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
