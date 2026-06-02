import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function BlogPost({ post }) {
  const navigate = useNavigate()

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    })
  }

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: customDelay
      }
    })
  }

  return (
    <article className="max-w-[680px] mx-auto pt-36 pb-28 px-6 font-body select-none">
      {/* 1. SEO Head Tags */}
      <Helmet>
        <title>{post.title} — Hovio Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hovio.com/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      {/* 2. Blog Header Block */}
      <header className="flex flex-col items-center text-center">
        {/* Category Pill */}
        <motion.span
          custom={0.1}
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="inline-block px-3.5 py-1 bg-green-light text-green-accent rounded-full text-[12px] font-medium tracking-wide uppercase font-body"
        >
          {post.category}
        </motion.span>

        {/* Title */}
        <motion.h1
          custom={0.2}
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-normal text-text-primary leading-[1.15] mt-5 text-[clamp(32px,5vw,56px)] select-text"
        >
          {post.title}
        </motion.h1>

        {/* Meta row info */}
        <motion.div
          custom={0.3}
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2.5 mt-5 text-[14px] text-text-muted font-light font-body"
        >
          <span>{formatDate(post.date)}</span>
          <span className="opacity-40">·</span>
          <span>{post.readTime}</span>
        </motion.div>

        {/* Divider line scale animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.5 }}
          style={{ originX: 0 }}
          className="h-[1px] bg-border w-20 my-10"
        />
      </header>

      {/* 3. Markdown Render Body (using prose wrapper) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        className="prose-hovio text-left select-text"
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>

      {/* 4. Article Footer back navigation */}
      <footer className="mt-16 text-left select-none">
        <div className="h-[1px] bg-border w-full mb-10" />
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-green-primary hover:underline transition-all duration-200"
        >
          ← Back to Blog
        </button>
      </footer>
    </article>
  )
}
