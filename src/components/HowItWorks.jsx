import { motion } from 'motion/react'

const STEPS = [
  {
    number: '01',
    title: 'Share your story',
    description: "Tell us how you're feeling, what you've been through, and what kind of support you're looking for.",
    // Person silhouette head + shoulders outline SVG
    icon: (
      <svg className="w-7 h-7 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 21a6 6 0 0 0-12 0" />
        <circle cx="12" cy="10" r="4" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Hovio learns you',
    description: 'Our AI builds a deep understanding of your needs, preferences, and emotional patterns over time.',
    // Minimal sparkle / 4-point star SVG
    icon: (
      <svg className="w-7 h-7 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18M12 3l3 9-3 9-3-9 3-9Z" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Meet your therapist',
    description: 'Get matched with a certified therapist who truly fits — and access AI support anytime in between.',
    // Two overlapping circles (representing connection)
    icon: (
      <svg className="w-7 h-7 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </svg>
    )
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-white py-28 relative overflow-hidden font-body select-none">
      <div className="max-width-container">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[12px] font-semibold text-green-accent uppercase tracking-widest block mb-4">
            How It Works
          </span>
          <h2 className="font-display font-normal text-text-primary text-[clamp(36px,4vw,52px)] leading-[1.15] max-w-[480px] mx-auto">
            Simple steps to feeling understood.
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
          
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
              className="flex flex-col items-center text-center relative px-4 z-10"
            >
              {/* Decorative Large Background Step Number */}
              <div 
                className="font-display italic font-normal text-[80px] text-green-light leading-none select-none absolute -top-8 -left-2 md:-left-4 opacity-75 z-0 pointer-events-none"
              >
                {step.number}
              </div>

              {/* Hand-drawn Minimalist Stroke Icon Wrapper */}
              <div className="w-14 h-14 rounded-full bg-green-light/40 border border-green-light flex items-center justify-center mb-6 relative z-10">
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="font-display font-normal text-[22px] text-text-primary mb-3 relative z-10">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-[15px] text-text-secondary leading-relaxed max-w-[240px] font-light relative z-10">
                {step.description}
              </p>

              {/* Desktop Decorative dashed connector lines */}
              {idx < 2 && (
                <div 
                  className="hidden md:block absolute top-7 left-[calc(50%+60px)] w-[calc(100%-120px)] h-[1px] border-t border-dashed border-border z-0" 
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}
