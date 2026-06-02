import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const STATUS_LINES = [
  { time: 'Mar 2025', label: 'Core platform architecture', status: 'complete' },
  { time: 'May 2025', label: 'AI memory & learning engine', status: 'complete' },
  { time: 'Jul 2025', label: 'End-to-end encryption layer', status: 'complete' },
  { time: 'Sep 2025', label: 'Therapist onboarding pipeline', status: 'complete' },
  { time: 'Now',      label: 'Beta access — opening soon', status: 'active' },
]

export default function StatusLog() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    let timeout

    if (isFadingOut) {
      timeout = setTimeout(() => {
        setIsFadingOut(false)
        setVisibleCount(0)
      }, 600) // fade out duration
      return () => clearTimeout(timeout)
    }

    if (visibleCount < STATUS_LINES.length) {
      timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1)
      }, 300) // 300ms delay between lines
      return () => clearTimeout(timeout)
    } else {
      // 5s pause before fading out and resetting the loop
      timeout = setTimeout(() => {
        setIsFadingOut(true)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [visibleCount, isFadingOut])

  return (
    <div className="w-full max-w-[440px] mx-auto bg-white border border-[#E4EAE4] rounded-2xl p-7 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] text-left select-none transition-all duration-300">
      
      {/* Header row */}
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-accent"></span>
        </span>
        <span className="text-[12px] font-semibold text-text-muted uppercase tracking-wider font-body">
          Hovio / Build Progress
        </span>
      </div>

      {/* Rows Container */}
      <div className="flex flex-col gap-3 min-h-[190px]">
        <AnimatePresence mode="wait">
          {!isFadingOut && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3.5"
            >
              {STATUS_LINES.slice(0, visibleCount).map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex items-center justify-between pb-3 border-b border-border/40 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-[11px] text-text-muted font-mono tracking-tight font-medium w-[68px] shrink-0"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      [{line.time}]
                    </span>
                    <span className="text-[13.5px] font-medium text-text-secondary font-body">
                      {line.label}
                    </span>
                  </div>
                  <div className="shrink-0 pl-4">
                    {line.status === 'complete' ? (
                      <span className="text-[14px] text-green-accent font-bold leading-none">
                        ✓
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5 text-green-primary">
                        <span className="relative flex h-2 w-2">
                          <span className="active-pulse-dot absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-80"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
                        </span>
                        <span className="text-[12px] font-medium tracking-tight">
                          Opening soon
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
