import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { supabase } from '../lib/supabase'

const LICENCE_TYPES = [
  'Licensed Professional Counselor (LPC)',
  'Licensed Clinical Social Worker (LCSW)',
  'Licensed Marriage and Family Therapist (LMFT)',
  'Licensed Mental Health Counselor (LMHC)',
  'Psychologist (PhD / PsyD)',
  'Psychiatrist (MD)',
  'Certified Counselor',
  'Other',
]

export default function TherapistForm() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    license_type: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Handle clicking outside to close custom dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectLicense = (val) => {
    setForm((prev) => ({ ...prev, license_type: val }))
    setIsDropdownOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase
      .from('therapist_interest')
      .insert({
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        country: form.country.trim(),
        license_type: form.license_type,
      })

    if (error) {
      if (error.code === '23505') {
        setErrorMsg("You're already registered. We'll be in touch soon.")
      } else {
        setErrorMsg('Something went wrong. Please try again.')
      }
      setStatus('error')
      return
    }

    setStatus('success')
  }

  // Shared input style — matches Hovio design system
  const inputClass = `
    w-full h-12 px-4 rounded-xl border border-[#E4EAE4] bg-white
    font-body text-[15px] text-text-primary placeholder:text-text-muted
    focus:outline-none focus:border-green-accent transition-colors duration-200
  `

  const labelClass = `
    block font-body text-[13px] font-medium text-text-secondary mb-2
  `

  return (
    <section
      id="therapists"
      className="w-full bg-white py-28 font-body border-t border-[#E4EAE4]"
    >
      <div className="max-width-container px-6">

        {/* Two column layout: left text, right form */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">

          {/* Left — text block */}
          <motion.div
            className="w-full md:w-[42%] md:sticky md:top-32"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1, fallback: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[12px] font-semibold text-green-accent uppercase tracking-widest block mb-4">
              For Therapists
            </span>
            <h2 className="font-display font-normal text-text-primary text-[clamp(32px,4vw,48px)] leading-[1.15] mb-6">
              Join Hovio as a
              <em> certified </em>
              therapist.
            </h2>
            <p className="text-[16px] text-text-secondary leading-relaxed font-light mb-8 max-w-[380px]">
              We're building a network of verified, compassionate therapists
              who want to work alongside AI to reach more people and
              deliver better care.
            </p>

            {/* Three trust points */}
            {[
              'Work on your own schedule',
              'AI handles admin, you focus on people',
              'Join a waitlist-free, matched client base',
            ].map((point, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1, fallback: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.1 + i * 0.1,
                }}
              >
                <div className="w-5 h-5 rounded-full bg-green-light flex items-center justify-center shrink-0">
                  <svg
                    className="w-3 h-3 text-green-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-[14px] text-text-secondary font-light">
                  {point}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="w-full md:w-[58%]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1, fallback: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          >
            <AnimatePresence mode="wait">

              {/* Success state */}
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border border-[#E4EAE4] rounded-2xl p-10 text-center bg-white"
                >
                  <div className="w-14 h-14 rounded-full bg-green-light flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-6 h-6 text-green-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-display font-normal text-[26px] text-text-primary mb-3">
                    We'll be in touch.
                  </h3>
                  <p className="text-[15px] text-text-secondary font-light leading-relaxed max-w-[320px] mx-auto">
                    Thank you for your interest in joining Hovio.
                    Our team will reach out to you shortly.
                  </p>
                </motion.div>

              ) : (

                /* Form */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-[#E4EAE4] rounded-2xl p-8 md:p-10 bg-white space-y-6"
                >

                  {/* Full name */}
                  <div>
                    <label className={labelClass} htmlFor="full_name">
                      Full name <span className="text-green-accent">*</span>
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Dr. Jane Smith"
                      value={form.full_name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass} htmlFor="therapist_email">
                      Email address <span className="text-green-accent">*</span>
                    </label>
                    <input
                      id="therapist_email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="jane@clinic.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass} htmlFor="phone">
                      Phone number
                      <span className="text-text-muted font-normal ml-1">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 555 000 0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Country + Licence type — side by side on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass} htmlFor="country">
                        Country <span className="text-green-accent">*</span>
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        autoComplete="country-name"
                        required
                        placeholder="United States"
                        value={form.country}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div className="relative" ref={dropdownRef}>
                      <label className={labelClass} htmlFor="license_type">
                        Licence type <span className="text-green-accent">*</span>
                      </label>
                      
                      <button
                        type="button"
                        id="license_type"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`${inputClass} flex items-center justify-between text-left cursor-pointer`}
                      >
                        <span className={form.license_type ? 'text-text-primary' : 'text-text-muted'}>
                          {form.license_type || 'Select type'}
                        </span>
                        <motion.svg
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-4 h-4 text-text-muted shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </motion.svg>
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="absolute z-50 left-0 right-0 mt-2 py-2 bg-white border border-[#E4EAE4] rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.04)] max-h-60 overflow-y-auto outline-none font-body text-[14px]"
                          >
                            {LICENCE_TYPES.map((lt) => (
                              <li key={lt}>
                                <button
                                  type="button"
                                  onClick={() => handleSelectLicense(lt)}
                                  className={`w-full px-4 py-3 text-left hover:bg-green-light/45 transition-colors flex items-center justify-between font-body ${
                                    form.license_type === lt ? 'text-green-primary font-medium' : 'text-text-secondary'
                                  }`}
                                >
                                  <span>{lt}</span>
                                  {form.license_type === lt && (
                                    <svg
                                      className="w-4 h-4 text-green-accent"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                  )}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {status === 'error' && errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-[13px] text-red-500 font-light"
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-full h-12 rounded-xl bg-green-primary text-white font-body font-medium text-[15px] disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Express interest'
                    )}
                  </motion.button>

                  <p className="text-[12px] text-text-muted font-light text-center leading-relaxed">
                    By submitting you agree to be contacted by the Hovio team.
                    We will never share your details with third parties.
                  </p>

                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
