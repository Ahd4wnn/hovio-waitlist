import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react'
import { supabase } from '../lib/supabase'
import { AuroraBackground } from './AuroraBackground'
import StatusLog from './StatusLog'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(142) // Sandbox default

  // Magnetic button settings using useMotionValue and useSpring
  const buttonRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 20 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Fetch count from Supabase
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
      setErrorMessage('Network error. Please try again.')
    }
  }

  const handleMouseMove = (e) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const maxPull = 10
    const pullFactor = 0.2

    const x = Math.min(Math.max(distanceX * pullFactor, -maxPull), maxPull)
    const y = Math.min(Math.max(distanceY * pullFactor, -maxPull), maxPull)

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Split headline text into individual words
  const words = "Therapy that learns, matches, and shows up.".split(" ")

  return (
    <AuroraBackground className="min-h-screen py-24 select-none relative bg-white">
      <div className="max-width-container w-full flex flex-col items-center justify-center text-center">
        <div className="max-w-[680px] w-full flex flex-col items-center">
          
          {/* 1. Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="bg-green-light text-green-primary rounded-full px-3.5 py-1.5 text-[13px] font-medium font-body mb-8 inline-flex items-center gap-2 border border-[#C8EAD1] shadow-sm shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="active-pulse-dot absolute inline-flex h-full w-full rounded-full bg-green-accent opacity-85"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-accent"></span>
            </span>
            Building something important
          </motion.div>

          {/* 2. Headline */}
          <h1 className="font-display font-normal text-text-primary leading-[1.1] mb-6 max-w-[640px] tracking-tight text-[clamp(36px,8vw,48px)] md:text-[clamp(44px,6vw,72px)]">
            {words.map((word, idx) => {
              // Beautiful italic font styling for the word "learns,"
              const isLearns = word.toLowerCase().includes('learns')
              return (
                <motion.span
                  key={idx}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.25 + idx * 0.06,
                  }}
                >
                  {isLearns ? (
                    <em className="font-display italic font-normal tracking-wide text-green-primary">
                      learns,
                    </em>
                  ) : (
                    word
                  )}
                </motion.span>
              )
            })}
          </h1>

          {/* 3. Sub-headline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
            className="text-[17px] md:text-[18px] text-text-secondary max-w-[520px] leading-relaxed font-body font-light mb-10"
          >
            Hovio connects you with certified therapists chosen by AI — and stays by your side whenever you need it, 24/7.
          </motion.p>

          {/* Grid Swapping Layout */}
          <div className="w-full flex flex-col gap-10">
            
            {/* StatusLog Progress Card (order-5 on mobile, order-4 on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              className="w-full order-5 md:order-4"
            >
              <StatusLog />
            </motion.div>

            {/* Email capturing captures (order-4 on mobile, order-5 on desktop) */}
            <div className="w-full order-4 md:order-5 flex flex-col items-center">
              
              <motion.form
                id="hero-waitlist-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="w-full max-w-[480px] flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    placeholder="your@email.com"
                    className="w-full px-[18px] h-[52px] bg-white text-text-primary border border-[#E4EAE4] focus:border-green-accent rounded-xl outline-none font-body text-[16px] transition-colors"
                    required
                  />
                </div>

                <motion.button
                  ref={buttonRef}
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ x: springX, y: springY }}
                  className="h-[52px] px-[28px] bg-green-primary hover:bg-[#154626] disabled:bg-green-primary/80 text-white font-medium font-body rounded-xl text-[15px] flex items-center justify-center gap-2 transition-colors relative overflow-hidden shrink-0 shadow-md"
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

              {/* Status notifications */}
              <div className="h-6 mt-3.5">
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-green-primary text-[14px] font-medium font-body"
                    >
                      You're on the list 🌿 We'll be in touch.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-red-600 text-[14px] font-medium font-body"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Proof count */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="text-[13px] text-text-muted font-body mt-2.5"
              >
                Join <span className="font-semibold text-text-secondary">{waitlistCount}</span> people already waiting
              </motion.p>

            </div>
          </div>

        </div>
      </div>
    </AuroraBackground>
  )
}
