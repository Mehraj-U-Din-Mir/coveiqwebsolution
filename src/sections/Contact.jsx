import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Youtube, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'meermehraj25@gmail.com',
    href: 'mailto:meermehraj25@gmail.com',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+91 6005459096',
    href: 'https://wa.me/916005459096',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Srinagar, Kashmir, India',
    href: '#',
  },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mehraj-u-din-mir-6ab342222/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@coveiqkashmir', label: 'YouTube' },
  { icon: Mail, href: 'mailto:meermehraj25@gmail.com', label: 'Email' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Contact</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;m always open to discussing 
            new opportunities and innovative ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="text-white/50 mb-8 leading-relaxed">
              Whether you&apos;re looking for AI solutions, web development, or educational 
              consulting, I&apos;m here to help bring your vision to life.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5 hover:border-electric-blue/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center group-hover:bg-electric-blue/20 transition-colors">
                    <info.icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <div className="text-sm text-white/40">{info.label}</div>
                    <div className="font-medium text-white group-hover:text-electric-blue transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/40 mb-4 uppercase tracking-wider">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-electric-blue/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle className="w-16 h-16 text-neon-cyan mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/50">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="relative">
                      <motion.label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'name' || formData.name
                            ? 'top-1 text-xs text-electric-blue'
                            : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
                        }`}
                      >
                        Your Name
                      </motion.label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-white/5 border rounded-xl px-4 pt-6 pb-2 text-white outline-none transition-all ${
                          errors.name ? 'border-red-400/50' : focusedField === 'name' ? 'border-electric-blue/50' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </motion.span>
                      )}
                    </div>

                    <div className="relative">
                      <motion.label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'email' || formData.email
                            ? 'top-1 text-xs text-electric-blue'
                            : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
                        }`}
                      >
                        Email Address
                      </motion.label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-white/5 border rounded-xl px-4 pt-6 pb-2 text-white outline-none transition-all ${
                          errors.email ? 'border-red-400/50' : focusedField === 'email' ? 'border-electric-blue/50' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </motion.span>
                      )}
                    </div>

                    <div className="relative">
                      <motion.label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'subject' || formData.subject
                            ? 'top-1 text-xs text-electric-blue'
                            : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
                        }`}
                      >
                        Subject
                      </motion.label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:border-electric-blue/50 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <motion.label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'message' || formData.message
                            ? 'top-1 text-xs text-electric-blue'
                            : 'top-4 text-sm text-white/40'
                        }`}
                      >
                        Your Message
                      </motion.label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className={`w-full bg-white/5 border rounded-xl px-4 pt-6 pb-2 text-white outline-none transition-all resize-none ${
                          errors.message ? 'border-red-400/50' : focusedField === 'message' ? 'border-electric-blue/50' : 'border-white/10'
                        }`}
                      />
                      {errors.message && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </motion.span>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-electric-blue to-neon-cyan text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// export default Contact