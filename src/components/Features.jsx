import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    title: 'Private by design',
    body: 'Your data is end-to-end encrypted and never sold. What you share stays between you and your care team.',
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
    icon: (
      <svg className="w-5 h-5 text-green-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  }
]

export default function Features() {
  const sectionRef = useRef(null)

  // 1. GSAP Scroll Trigger Staggered Reveal Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-feature-card',
        {
          opacity: 0,
          y: 60,
          rotateX: 12,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert() // clean unmount contexts
  }, [])

  // 2. Tactile 3D Tilt Hover calculations
  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return
    const rect = cardEl.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Get mouse offset relative to card center (-0.5 to 0.5 bounds)
    const relX = (x / rect.width) - 0.5
    const relY = (y / rect.height) - 0.5

    // Map to max ±7deg subtle pivot (calm & clinical, not loud)
    const tiltX = -relY * 14
    const tiltY = relX * 14

    gsap.to(cardEl, {
      rotateX: tiltX,
      rotateY: tiltY,
      z: 10,
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.05)',
      transformPerspective: 800,
      ease: 'power2.out',
      duration: 0.4
    })
  }

  const handleMouseLeave = (cardEl) => {
    if (!cardEl) return
    // Clean spring reset to center flat
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
      ease: 'power4.out',
      duration: 0.6
    })
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-bg-subtle py-28 relative overflow-hidden font-body select-none"
    >
      <div className="max-width-container">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <span className="text-[12px] font-semibold text-green-accent uppercase tracking-widest block mb-4">
            What You Get
          </span>
          <h2 className="font-display font-normal text-text-primary text-[clamp(36px,4vw,52px)] leading-[1.15] max-w-[500px] mx-auto">
            Everything therapy should have always been.
          </h2>
        </div>

        {/* Feature Cards Grid (configured for preserve-3d) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto overflow-visible [perspective:1200px]">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e, e.currentTarget)}
              className="gsap-feature-card bg-white border border-[#E4EAE4] rounded-[20px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-colors duration-300 hover:border-green-muted flex flex-col sm:flex-row items-start gap-5 group cursor-pointer will-change-transform [transform-style:preserve-3d]"
            >
              {/* Icon Container (shifted on hover in preserve-3d) */}
              <div className="w-11 h-11 rounded-full bg-green-light flex items-center justify-center shrink-0 [transform:translateZ(15px)]">
                {feature.icon}
              </div>

              {/* Text Block */}
              <div className="flex-1 text-left [transform:translateZ(10px)]">
                <h3 className="font-display font-normal text-[21px] text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-[14.5px] text-text-secondary leading-relaxed font-light">
                  {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
