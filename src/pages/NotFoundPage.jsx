import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <>
      <SEO title="Page not found" description="This page doesn't exist." />
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--green-accent)', marginBottom: '16px' }}>
          404
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.15,
          marginBottom: '20px' }}>
          This page doesn't exist yet.
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px',
          color: 'var(--text-secondary)', maxWidth: '400px',
          lineHeight: 1.7, marginBottom: '40px' }}>
          But Hovio is being built carefully, one page at a time.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'var(--green-primary)', color: 'white',
            border: 'none', borderRadius: '100px', padding: '12px 28px',
            fontSize: '15px', fontFamily: 'var(--font-body)',
            fontWeight: 500, cursor: 'pointer' }}>
          Back to home
        </button>
      </motion.div>
    </>
  )
}
