import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { supabase } from '../lib/supabase'
import TerminalWidget from './TerminalWidget'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(142) // Fallback default

  // Magnetic button state
  const buttonRef = useRef(null)
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 })

  // Fetch count live on mount
  useEffect(() => {
    let active = true
    const fetchCount = async () => {
      try {
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })
        if (active && !error && count !== null) {
          setWaitlistCount(count)
        }
      } catch (err) {
        console.error('Error fetching waitlist count:', err)
      }
    }
    fetchCount()
    return () => {
      active = false
    }
  }, [status])

  // Submit hander
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({ email })

      if (error) {
        // Unique violation or duplicates check
        if (error.code === '23505' || (error.message && error.message.includes('already exists'))) {
          setStatus('error')
          setErrorMessage("You're already on the list!")
        } else {
          setStatus('error')
          setErrorMessage(error.message || 'An error occurred. Please try again.')
        }
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error. Please try again later.')
    }
  }

  // Magnetic button mouse movement tracker
  const handleMouseMove = (e) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Define max pull and sensitivity coefficient
    const maxPull = 8
    const pullFactor = 0.15

    const x = Math.min(Math.max(distanceX * pullFactor, -maxPull), maxPull)
    const y = Math.min(Math.max(distanceY * pullFactor, -maxPull), maxPull)

    setButtonOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setButtonOffset({ x: 0, y: 0 })
  }

  // Animation constants
  const headlineWords = "Therapy that learns, matches, and shows up.".split(" ")

  return (
    <section className="min-height-[100vh] py-24 flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-light/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-width-container w-full flex flex-col items-center justify-center text-center relative z-10">
        <div className="max-w-[720px] w-full flex flex-col items-center">
          
          {/* 1. Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5EC] text-[#1C5C32] text-[13px] font-semibold tracking-wide mb-8 shadow-sm border border-[#C8EAD1]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D9A50] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3D9A50]"></span>
            </span>
            Building
          </motion.div>

          {/* 2. Headline */}
          <h1 className="text-[40px] md:text-[64px] font-bold text-text-primary tracking-tight leading-[1.1] mb-6 select-none max-w-[640px]">
            {headlineWords.map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-[0.25em]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + idx * 0.05,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* 3. Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-base md:text-[18px] text-text-secondary max-w-[520px] leading-relaxed mb-10"
          >
            Hovio connects you with certified therapists chosen by AI — and stays by your side, 24/7.
          </motion.p>

          {/* Layout Container for responsive order (swap terminal and form on mobile) */}
          <div className="w-full flex flex-col gap-10">
            
            {/* Terminal Widget (order-2 on mobile, order-1 on desktop) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="w-full order-2 md:order-1"
            >
              <TerminalWidget />
            </motion.div>

            {/* Email Form Container (order-1 on mobile, order-2 on desktop) */}
            <div className="w-full order-1 md:order-2 flex flex-col items-center">
              <motion.form
                id="hero-waitlist-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="w-full max-w-[480px] flex flex-col md:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    placeholder="Enter your email"
                    className="w-full px-4 h-12 bg-white text-text-primary border border-border focus:border-[#3D9A50] focus:ring-1 focus:ring-[#3D9A50] rounded-xl outline-none transition-all text-[15px]"
                    required
                  />
                </div>

                <motion.button
                  ref={buttonRef}
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  animate={{ x: buttonOffset.x, y: buttonOffset.y }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
                  className="h-12 px-6 bg-[#1C5C32] hover:bg-[#154626] text-white font-semibold rounded-xl text-[14px] flex items-center justify-center gap-2 transition-colors relative overflow-hidden group shadow-md"
                >
                  {status === 'loading' ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    'Join the waitlist'
                  )}
                </motion.button>
              </motion.form>

              {/* Status Notifications */}
              <div className="h-6 mt-3">
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-[#1C5C32] text-sm font-medium"
                    >
                      You're on the list. We'll be in touch. 🌿
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-red-600 text-sm font-medium"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* 6. Social Proof */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-[13px] text-text-muted mt-2"
              >
                Join <span className="font-semibold text-text-secondary">{waitlistCount}</span> people already waiting
              </motion.p>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
