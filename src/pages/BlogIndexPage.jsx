import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import BlogIndex from '../components/blog/BlogIndex'
import Footer from '../components/Footer'

export default function BlogIndexPage() {
  return (
    <>
      <SEO
        title="Blog"
        description="Thoughts on therapy, technology, and mental health from the Hovio team."
        url="https://hovio.com/blog"
      />
      
      <Navbar />
      <BlogIndex />
      <Footer />
    </>
  )
}

