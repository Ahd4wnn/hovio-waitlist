import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemStrip from './components/ProblemStrip'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemStrip />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
