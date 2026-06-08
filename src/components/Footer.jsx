import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Youtube, Mail, Heart, ArrowUp, MapPin } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mehraj-u-din-mir-6ab342222/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@coveiqkashmir', label: 'YouTube' },
  { icon: Mail, href: 'mailto:meermehraj25@gmail.com', label: 'Email' },
]

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '#hero' },
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'AI Development', href: '#services' },
      { name: 'Full Stack Development', href: '#services' },
      { name: 'AI Consulting', href: '#services' },
      { name: 'EdTech Solutions', href: '#services' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mehraj-u-din-mir-6ab342222/' },
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'YouTube', href: 'https://www.linkedin.com/in/mehraj-u-din-mir-6ab342222/' },
      { name: 'WhatsApp', href: 'https://wa.link/kj1m17' },
    ],
  },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-graphite/30 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">Mehraj U Din</span>
                <span className="gradient-text"> Mir</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                AI Developer, Full Stack Developer, Educator & Content Creator. 
                Building intelligent solutions from Srinagar, Kashmir.
              </p>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Srinagar, Jammu & Kashmir, India</span>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {footerLinks.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-electric-blue text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-electric-blue hover:border-electric-blue/30 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <p className="text-white/30 text-sm flex items-center gap-1">
            Crafted with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> by Mehraj U Din Mir
          </p>

          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center text-electric-blue hover:bg-electric-blue/20 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="mt-8 text-center text-white/20 text-xs">
          © {new Date().getFullYear()} Mehraj U Din Mir. All rights reserved.
        </div>
      </div>
    </footer>
  )
}