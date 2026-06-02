import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

export default function BlogCard({ post, delay = 0 }) {
  const navigate = useNavigate()

  // Format date to: Month Day, Year (e.g. May 12, 2025)
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // Prevent offset timezone shifts
    })
  }

  const handleCardClick = () => {
    navigate(`/blog/${post.slug}`)
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onClick={handleCardClick}
      className="bg-white border border-[#E4EAE4] rounded-[20px] p-9 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-green-muted hover:-translate-y-1 cursor-pointer flex flex-col justify-between text-left group min-h-[320px] select-none"
    >
      {/* Upper content */}
      <div>
        {/* Category Pill */}
        <span className="inline-block px-3 py-1 bg-green-light text-green-accent rounded-full text-[12px] font-medium font-body leading-none">
          {post.category}
        </span>

        {/* Title */}
        <h3 className="font-display font-normal text-[24px] text-text-primary leading-tight mt-4 select-none">
          {post.title}
        </h3>

        {/* Excerpt with 3-line clamp */}
        <p className="text-[15px] text-text-secondary leading-relaxed font-body font-light mt-2.5 line-clamp-3 select-none">
          {post.excerpt}
        </p>
      </div>

      {/* Bottom Content row */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
        <div className="flex items-center gap-4 text-[13px] text-text-muted font-body font-light">
          <span>{formatDate(post.date)}</span>
          <span className="text-[10px] opacity-40">●</span>
          <span>{post.readTime}</span>
        </div>

        {/* Hover sliding arrow */}
        <motion.div
          variants={{
            initial: { x: 0 },
            hover: { x: 4 }
          }}
          initial="initial"
          whileHover="hover"
          className="text-green-primary text-[18px] font-bold group-hover:translate-x-1 transition-transform duration-300"
        >
          →
        </motion.div>
      </div>
    </motion.div>
  )
}
