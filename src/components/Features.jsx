import { motion } from 'motion/react'

const FEATURES = [
  {
    title: 'Private by design',
    body: 'Your data is end-to-end encrypted and never sold. What you share stays between you and your care team.',
    // Shield with checkmark SVG
    icon: (
      <svg className="w-5 h-5 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 11 2 2 4-4" />
      </svg>
    )
  },
  {
    title: 'Always available',
    body: "AI-powered support is available around the clock — so you're never left waiting until your next session.",
    // Clock with circular arrow SVG
    icon: (
      <svg className="w-5 h-5 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.7" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  },
  {
    title: 'AI that remembers',
    body: 'Hovio learns from every conversation to give you increasingly personalised, thoughtful support.',
    // Brain / Network nodes SVG
    icon: (
      <svg className="w-5 h-5 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M9 12h6M9 12l6-5M9 12l6 5" />
      </svg>
    )
  },
  {
    title: 'Certified therapists',
    body: 'Every therapist on Hovio holds verified credentials and is trained to work alongside AI-assisted insights.',
    // Ribbon badge SVG
    icon: (
      <svg className="w-5 h-5 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
      </svg>
    )
  },
  {
    title: 'Matched for you',
    body: 'Our matching model considers your personality, history, and goals — not just availability and location.',
    // Two people outline SVG
    icon: (
      <svg className="w-5 h-5 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: 'Human-first approach',
    body: 'Technology supports your care, but humans lead it. Hovio is built around people, not products.',
    // Heart outline SVG
    icon: (
      <svg className="w-5 h-5 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  }
]

export default function Features() {
  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (idx) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: idx * 0.08,
      }
    })
  }

  return (
    <section className="w-full bg-bg-subtle py-28 relative overflow-hidden font-body select-none">
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
            What You Get
          </span>
          <h2 className="font-display font-normal text-text-primary text-[clamp(36px,4vw,52px)] leading-[1.15] max-w-[500px] mx-auto">
            Everything therapy should have always been.
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="bg-white border border-[#E4EAE4] rounded-[20px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-green-muted flex flex-col sm:flex-row items-start gap-5 group"
            >
              {/* Icon Container */}
              <div className="w-11 h-11 rounded-full bg-green-light flex items-center justify-center shrink-0">
                {feature.icon}
              </div>

              {/* Text Block */}
              <div className="flex-1 text-left">
                <h3 className="font-display font-normal text-[21px] text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-[14.5px] text-text-secondary leading-relaxed font-light">
                  {feature.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
