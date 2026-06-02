import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { supabase } from '../lib/supabase'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage('Enter a valid email.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({ email })

      if (error) {
        if (error.code === '23505' || (error.message && error.message.includes('already exists'))) {
          setStatus('error')
          setErrorMessage("Already registered!")
        } else {
          setStatus('error')
          setErrorMessage(error.message || 'An error occurred.')
        }
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error.')
    }
  }

  const handleLinkClick = (e) => {
    e.preventDefault()
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-bg-subtle border-t border-[#E4EAE4] py-16 pb-10 select-none relative z-10 font-body"
    >
      <div className="max-width-container">
        
        {/* Main Footer columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-16">
          
          {/* Column 1: Brand & tagline */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group self-start">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.jpg" 
                  alt="Hovio logo" 
                  width="32"
                  height="32"
                  className="w-full h-full object-contain"
                />
              </div>
              <span 
                className="text-[20px] font-normal tracking-tight text-green-primary lowercase"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-0.02em' }}
              >
                hovio
              </span>
            </a>
            {/* Tagline */}
            <p className="text-[14px] text-text-secondary leading-relaxed font-light max-w-[260px]">
              Therapy that learns, matches, and shows up.
            </p>
            {/* Small note */}
            <p className="text-[12px] text-text-muted leading-relaxed font-light max-w-[260px]">
              Currently building. Join the waitlist to get early access.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4 md:pl-10">
            <span className="text-[12px] font-semibold text-text-primary uppercase tracking-wider block">
              Company
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a 
                  href="#about" 
                  onClick={handleLinkClick}
                  className="text-[13px] text-text-secondary hover:text-text-primary transition-colors font-light"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#blog" 
                  onClick={handleLinkClick}
                  className="text-[13px] text-text-secondary hover:text-text-primary transition-colors font-light"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  onClick={handleLinkClick}
                  className="text-[13px] text-text-secondary hover:text-text-primary transition-colors font-light"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  onClick={handleLinkClick}
                  className="text-[13px] text-text-secondary hover:text-text-primary transition-colors font-light"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Compact waitlist input */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-semibold text-text-primary uppercase tracking-wider block">
              Stay in the loop
            </span>
            
            <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-[320px]">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                placeholder="your@email.com"
                className="flex-1 px-3 h-11 bg-white text-text-primary border border-[#E4EAE4] focus:border-green-accent rounded-xl outline-none font-body text-[14px] transition-colors"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="h-11 px-4 bg-green-primary hover:bg-[#154626] disabled:bg-green-primary/80 text-white font-medium rounded-xl text-[13px] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {status === 'loading' ? (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Join'
                )}
              </button>
            </form>

            {/* Form state responses */}
            <div className="h-5">
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="text-green-primary text-[12px] font-medium"
                  >
                    You're on the list 🌿 We'll be in touch.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="text-red-600 text-[12px] font-medium"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Bottom bar (Copyright & socials) */}
        <div className="pt-8 border-t border-[#E4EAE4] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <span className="text-[13px] text-text-muted font-light">
            © 2025 Hovio. All rights reserved.
          </span>

          <div className="flex items-center gap-4">
            {/* Twitter / X */}
            <a 
              href="#twitter"
              onClick={handleLinkClick}
              className="w-8 h-8 rounded-full border border-border/80 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted/40 transition-all duration-300"
              aria-label="Twitter"
            >
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="#instagram"
              onClick={handleLinkClick}
              className="w-8 h-8 rounded-full border border-border/80 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted/40 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </motion.footer>
  )
}
