import { motion } from 'motion/react'
import { getAllPosts } from '../../lib/posts'
import BlogCard from './BlogCard'

export default function BlogIndex() {
  const posts = getAllPosts()
  const headlineWords = "Thoughts on therapy, technology, and you.".split(" ")

  return (
    <section className="w-full min-h-screen bg-white pt-36 pb-28 font-body select-none">
      <div className="max-width-container">
        
        {/* Centered Blog Hero Area */}
        <div className="max-w-[640px] mx-auto text-center mb-20">
          {/* Eyebrow Label */}
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-[12px] font-semibold text-green-accent uppercase tracking-widest block mb-4"
          >
            THE HOVIO BLOG
          </motion.span>

          {/* Staggered Serif Word-by-Word Headline */}
          <h1 className="font-display font-normal text-text-primary leading-[1.1] mb-6 tracking-tight text-[clamp(36px,5vw,64px)] select-none">
            {headlineWords.map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + idx * 0.05,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.85 }}
            className="text-[16px] text-text-secondary leading-relaxed font-light"
          >
            Essays and updates from the Hovio team on mental health, the future of care, and what we're building.
          </motion.p>
        </div>

        {/* Posts Cards Grid */}
        <div className="max-w-[1100px] mx-auto px-4 md:px-0 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-stretch">
            {posts.map((post, idx) => (
              <BlogCard 
                key={post.slug} 
                post={post} 
                delay={idx * 0.1} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
