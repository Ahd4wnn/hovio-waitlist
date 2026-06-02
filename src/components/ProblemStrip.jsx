import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'

function useCountUp(target, duration = 1500, isActive = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isActive) return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isActive, target, duration])
  return count
}

export default function ProblemStrip() {
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.5 })

  // 9 counts from 0, 200 counts from 0, 1 in 3 is static
  const count9 = useCountUp(9, 1500, isSectionInView)
  const count200 = useCountUp(200, 1500, isSectionInView)

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: customDelay,
      },
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="problem-strip"
      className="w-full bg-bg-subtle border-y border-[#E4EAE4] py-24 select-none relative overflow-hidden font-body"
    >
      <div className="max-width-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          
          {/* Card 1 */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, fallback: true }}
            className="flex-1 flex flex-col items-center text-center px-4"
          >
            <div 
              className="font-display font-normal text-green-primary leading-none mb-3 text-[clamp(44px,5vw,60px)]"
            >
              {count9} <span className="text-[28px] text-green-accent font-medium select-none">months</span>
            </div>
            <p className="text-[15px] text-text-secondary max-w-[160px] leading-relaxed">
              Average wait for a therapist appointment
            </p>
          </motion.div>
 
          {/* Vertical Divider 1 */}
          <div className="hidden md:block w-[1px] h-20 bg-border shrink-0 self-center" />
 
          {/* Card 2 */}
          <motion.div
            custom={0.1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, fallback: true }}
            className="flex-1 flex flex-col items-center text-center px-4"
          >
            <div 
              className="font-display font-normal text-green-primary leading-none mb-3 text-[clamp(44px,5vw,60px)]"
            >
              <span className="text-[28px] text-green-accent font-medium mr-0.5 select-none">$</span>{count200}<span className="text-[28px] text-green-accent font-medium select-none">+</span>
            </div>
            <p className="text-[15px] text-text-secondary max-w-[160px] leading-relaxed">
              Average cost per therapy session
            </p>
          </motion.div>
 
          {/* Vertical Divider 2 */}
          <div className="hidden md:block w-[1px] h-20 bg-border shrink-0 self-center" />
 
          {/* Card 3 (Static - animate in only) */}
          <motion.div
            custom={0.2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, fallback: true }}
            className="flex-1 flex flex-col items-center text-center px-4"
          >
            <div 
              className="font-display font-normal text-green-primary leading-none mb-3 text-[clamp(44px,5vw,60px)]"
            >
              1 <span className="text-[28px] text-green-accent font-medium select-none">in 3</span>
            </div>
            <p className="text-[15px] text-text-secondary max-w-[160px] leading-relaxed">
              People who need help never receive it
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
