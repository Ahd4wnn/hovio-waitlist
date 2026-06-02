import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import BlogIndex from '../components/blog/BlogIndex'
import Footer from '../components/Footer'

export default function BlogIndexPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Hovio</title>
        <meta name="description" content="Thoughts on therapy, technology, and mental health from the Hovio team." />
        <meta property="og:title" content="Blog — Hovio" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Navbar />
      <BlogIndex />
      <Footer />
    </>
  )
}
