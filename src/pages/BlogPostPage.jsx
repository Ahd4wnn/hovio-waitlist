import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import BlogPost from '../components/blog/BlogPost'
import Footer from '../components/Footer'
import { getPostBySlug } from '../lib/posts'

export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true })
    }
  }, [post, navigate])

  if (!post) return null

  return (
    <>
      <Navbar />
      <BlogPost post={post} />
      <Footer />
    </>
  )
}
