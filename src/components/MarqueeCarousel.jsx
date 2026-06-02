import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const ROW1_ITEMS = [
  'Certified Therapists',
  'AI-Powered Matching',
  'End-to-End Encrypted',
  '24/7 Support',
  'Human-First Care',
  'Private by Design',
  'Always Available',
  'Built with Trust'
]

const ROW2_ITEMS = [
  'Feel Understood',
  'Real Connections',
  'Your Story Matters',
  'No Waitlists',
  'Personalised Care',
  'Emotionally Intelligent',
  'Therapist + AI',
  'Always by Your Side'
]

export default function MarqueeCarousel() {
  const sectionRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const listener = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // Track the scroll position of the marquee section to apply vertical parallax offsets
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Vertical wave transformation (opposite directions) - disabled if reduced motion preferred
  const translateYRow1 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -20])
  const translateYRow2 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 20])

  // Helper to render one full seamless scrolling ribbon containing two duplicate blocks
  const renderMarqueeRibbon = (items, isRow1) => {
    // Duplicate standard array 4x to prevent gaps on ultrawide viewports
    const quadrupledItems = [...items, ...items, ...items, ...items]
    const duration = prefersReducedMotion ? 999999 : (isHovered ? 80 : (isRow1 ? 35 : 45))

    return (
      <motion.div
        animate={prefersReducedMotion ? {} : { x: isRow1 ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: duration,
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap"
      >
        {/* Block 1 */}
        <div className="flex items-center shrink-0">
          {quadrupledItems.map((item, idx) => (
            <div key={`b1-${idx}`} className="flex items-center select-none">
              <span 
                className={`text-[clamp(20px,2.5vw,28px)] transition-colors duration-300 font-medium ${
                  idx % 2 === 0 
                    ? 'text-text-primary font-body font-normal' 
                    : 'text-green-accent font-display font-normal italic'
                }`}
              >
                {item}
              </span>
              <span className="mx-6 text-[10px] text-green-light shrink-0 leading-none">●</span>
            </div>
          ))}
        </div>
        {/* Block 2 (identical copy to achieve seamless loop) */}
        <div className="flex items-center shrink-0">
          {quadrupledItems.map((item, idx) => (
            <div key={`b2-${idx}`} className="flex items-center select-none">
              <span 
                className={`text-[clamp(20px,2.5vw,28px)] transition-colors duration-300 font-medium ${
                  idx % 2 === 0 
                    ? 'text-text-primary font-body font-normal' 
                    : 'text-green-accent font-display font-normal italic'
                }`}
              >
                {item}
              </span>
              <span className="mx-6 text-[10px] text-green-light shrink-0 leading-none">●</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <section 
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-white py-16 overflow-hidden flex flex-col gap-6 select-none relative z-10"
    >
      
      {/* Row 1 (Left to Right, normal speed) */}
      <motion.div 
        style={{ y: translateYRow1 }} 
        className="w-full overflow-hidden flex cursor-pointer"
      >
        {renderMarqueeRibbon(ROW1_ITEMS, true)}
      </motion.div>

      {/* Row 2 (Right to Left, slightly slower) */}
      <motion.div 
        style={{ y: translateYRow2 }} 
        className="w-full overflow-hidden flex cursor-pointer"
      >
        {renderMarqueeRibbon(ROW2_ITEMS, false)}
      </motion.div>

    </section>
  )
}
