import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const ctx = gsap.context(() => {
      // Calculate scroll width amount dynamically based on responsive sizes
      const getScrollAmount = () => {
        const wrapperWidth = track.parentElement.clientWidth
        return track.scrollWidth - wrapperWidth + (window.innerWidth >= 768 ? 0 : 32)
      }

      // Setup ScrollTrigger Pinning configuration for both desktop and mobile
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        invalidateOnRefresh: true,
      })

      // Setup Horizontal translation scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none'
      })

      // Animate active card scales and shadows as they glide through viewport focus
      const cards = gsap.utils.toArray('.gsap-horizontal-card')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            scale: 0.94,
            opacity: 0.6,
            filter: 'blur(1px)'
          },
          {
            scale: 1.03,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left 65%',
              end: 'right 35%',
              scrub: true,
            }
          }
        )
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Tactile 3D Tilt Hover calculations
  const handleMouseMove = (e, cardEl) => {
    if (!cardEl || window.innerWidth < 768) return
    const rect = cardEl.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const relX = (x / rect.width) - 0.5
    const relY = (y / rect.height) - 0.5

    const tiltX = -relY * 8
    const tiltY = relX * 8

    gsap.to(cardEl, {
      rotateX: tiltX,
      rotateY: tiltY,
      z: 6,
      transformPerspective: 800,
      ease: 'power2.out',
      duration: 0.3
    })
  }

  const handleMouseLeave = (cardEl) => {
    if (!cardEl || window.innerWidth < 768) return
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      ease: 'power4.out',
      duration: 0.5
    })
  }

  return (
    <section
      ref={containerRef}
      id="features"
      className="w-full bg-bg-subtle h-screen relative overflow-hidden flex flex-col md:flex-row justify-center font-body select-none"
    >
      {/* Background smooth ambient green glows */}
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] bg-green-light/45 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#A8CDB4]/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-width-container w-full h-full flex flex-col md:flex-row items-center md:items-stretch relative z-10">
        
        {/* Left/Top Header Block: 28vh height on mobile, full height on desktop */}
        <div className="w-full md:w-[35%] lg:w-[30%] h-[28vh] md:h-full flex flex-col justify-center text-left px-8 md:px-0 md:pr-8 border-b md:border-b-0 md:border-r border-[#E4EAE4]/60 shrink-0 bg-bg-subtle/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none z-20">
          <span className="text-[11px] sm:text-[12px] font-semibold text-green-accent uppercase tracking-widest block mb-2 md:mb-4">
            What You Get
          </span>
          <h2 className="font-display font-normal text-text-primary text-[clamp(28px,4vw,52px)] leading-[1.12] mb-2 md:mb-6">
            Everything therapy should have always been.
          </h2>
          <p className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed font-light hidden md:block">
            Scroll down to explore how Hovio bridges human empathy with continuous AI support to keep you covered 24/7.
          </p>
        </div>

        {/* Right/Bottom Track Wrapper: 72vh height on mobile, full height on desktop */}
        <div className="w-full md:w-[65%] lg:w-[70%] h-[72vh] md:h-full flex items-center overflow-x-hidden relative md:pl-12 py-4 md:py-0">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 items-center px-6 md:px-0 overflow-x-visible whitespace-nowrap md:whitespace-normal [perspective:1200px]"
          >
            {FEATURES.map((feature, idx) => (
              <div
                key={idx}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e, e.currentTarget)}
                className="gsap-horizontal-card inline-block md:block w-[260px] sm:w-[320px] md:w-[385px] bg-white border border-[#E4EAE4] rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors duration-300 hover:border-green-accent flex-col items-start gap-4 sm:gap-6 cursor-pointer shrink-0 will-change-transform [transform-style:preserve-3d]"
              >
                {/* Icon Circle Container */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-light flex items-center justify-center shrink-0 mb-4 sm:mb-6 [transform:translateZ(15px)]">
                  {feature.icon}
                </div>

                {/* Text Block */}
                <div className="text-left [transform:translateZ(10px)] whitespace-normal">
                  <h3 className="font-display font-normal text-[20px] sm:text-[22px] md:text-[24px] text-text-primary mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] text-text-secondary leading-relaxed font-light">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
