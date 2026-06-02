import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'

// Custom count up hook with quadratic ease-out easing
function useCountUp(targetNumber, duration = 1500, trigger = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return

    let startTime = null
    let animationFrameId

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      // ease-out quadratic easing: percentage * (2 - percentage)
      const easePercentage = percentage * (2 - percentage)
      const currentVal = Math.floor(easePercentage * targetNumber)

      setCount(currentVal)

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(targetNumber)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [targetNumber, duration, trigger])

  return count
}

export default function ProblemStrip() {
  const containerRef = useRef(null)
  // useInView hook to detect when the section is visible in the viewport
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const count1 = useCountUp(9, 1500, isInView)
  const count2 = useCountUp(200, 1500, isInView)
  const count3 = useCountUp(1, 1500, isInView)

  // Stagger container and child variations for cards sliding up
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F8FAF8] border-y border-border py-24 select-none relative overflow-hidden"
    >
      {/* Container wrapper */}
      <div className="max-width-container">
        
        {/* Animated grid cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center"
        >
          {/* Card 1: 9 Months */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center text-center max-w-[280px]"
          >
            <div className="text-[52px] font-bold text-[#1C5C32] leading-none mb-3 tracking-tight">
              {count1} <span className="text-[32px] font-semibold text-[#3D9A50]">months</span>
            </div>
            <p className="text-[15px] font-medium text-text-secondary leading-relaxed">
              Average wait for a therapist
            </p>
          </motion.div>

          {/* Card 2: $200+ */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center text-center max-w-[280px]"
          >
            <div className="text-[52px] font-bold text-[#1C5C32] leading-none mb-3 tracking-tight">
              <span className="text-[32px] font-semibold text-[#3D9A50]">$</span>{count2}<span className="text-[32px] font-semibold text-[#3D9A50]">+</span>
            </div>
            <p className="text-[15px] font-medium text-text-secondary leading-relaxed">
              Per therapy session
            </p>
          </motion.div>

          {/* Card 3: 1 in 3 */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center text-center max-w-[280px]"
          >
            <div className="text-[52px] font-bold text-[#1C5C32] leading-none mb-3 tracking-tight">
              {count3} <span className="text-[32px] font-semibold text-[#3D9A50]">in 3</span>
            </div>
            <p className="text-[15px] font-medium text-text-secondary leading-relaxed">
              People never get the help they need
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
