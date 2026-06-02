import { motion } from 'motion/react'

const TRUST_POINTS = [
  'End-to-end encrypted sessions',
  'No data sold to third parties',
  'Delete your account and data anytime'
]

export default function PrivacyStrip() {
  return (
    <section id="privacy" className="w-full bg-green-primary py-24 select-none relative overflow-hidden font-body text-white">
      {/* Background organic glow details */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] bg-[#3D9A50]/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-width-container flex flex-col md:flex-row items-start md:items-center justify-between gap-12 relative z-10">
        
        {/* Left Side: Explanatory Header block */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex-1 text-left"
        >
          <span className="text-[12px] font-semibold text-white/60 uppercase tracking-widest block mb-4">
            Your Privacy
          </span>
          <h2 className="font-display font-normal text-white text-[clamp(32px,4vw,48px)] leading-[1.1] mb-5 max-w-[420px]">
            Your story is yours. We just help you tell it.
          </h2>
          <p className="text-[16px] text-white/75 leading-relaxed font-light max-w-[400px]">
            Hovio is built with privacy as a foundation, not a feature. We never sell your data, never show you ads, and you can delete everything at any time.
          </p>
        </motion.div>

        {/* Right Side: Trust points rows */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="flex flex-col gap-5 text-left shrink-0 w-full md:w-auto"
        >
          {TRUST_POINTS.map((point, idx) => (
            <div key={idx} className="flex items-center gap-4 py-1.5">
              {/* Checkmark icon enclosed in white opaque circle */}
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span className="text-[15px] font-medium text-white/95 tracking-wide">
                {point}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
