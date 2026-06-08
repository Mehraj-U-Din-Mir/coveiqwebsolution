import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, Sparkles, Zap, Eye, Brain, Cpu, Globe, ChevronRight, Star } from 'lucide-react'

// ════════════════════════════════════════════════════════════
// GLITCH TEXT EFFECT
// ════════════════════════════════════════════════════════════
function GlitchText({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const chars = '!<>-_\\\\/[]{}—=+*^?#________'
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(
          text.split('').map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )
        if (iteration >= text.length) {
          clearInterval(interval)
          setDisplayText(text)
        }
        iteration += 0.6
      }, 35)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  return <span className="font-mono">{displayText}</span>
}

// ════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ════════════════════════════════════════════════════════════
function MagneticButton({ children, onClick, variant = 'primary' }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.4)
    y.set((e.clientY - centerY) * 0.4)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }, [x])

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-sm overflow-hidden cursor-pointer group ${
        variant === 'primary' ? 'text-white' : 'text-white/70 hover:text-white'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 rounded-2xl p-[2px] overflow-hidden">
        <div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            background: variant === 'primary' 
              ? 'linear-gradient(135deg, #00d4ff, #00f5d4, #a78bfa, #00d4ff)' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
            opacity: isHovered ? 1 : 0.6,
          }}
        />
        <div className="absolute inset-[2px] rounded-2xl bg-[#0a0a0f]" />
      </div>
      <div 
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-200%)',
          transition: 'transform 0.8s ease',
        }}
      />
      <div 
        className="absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-500"
        style={{
          background: variant === 'primary' ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)',
          opacity: isHovered ? 1 : 0,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

// ════════════════════════════════════════════════════════════
// TILT BADGE
// ════════════════════════════════════════════════════════════
function TiltBadge({ text, icon: Icon, delay }) {
  const ref = useRef()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-60, 60], [20, -20])
  const rotateY = useTransform(x, [-60, 60], [-20, 20])

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative group"
    >
      <div className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-[#00d4ff]/90 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/10 transition-all duration-300 flex items-center gap-2 cursor-default">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {text}
      </div>
      <div className="absolute -inset-2 rounded-full bg-[#00d4ff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════
// ROUNDED RECTANGLE PROFILE IMAGE - LEFT SIDE
// ════════════════════════════════════════════════════════════
function ProfileImage() {
  const ref = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, scale: 0.8, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false) }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* Soft glow behind */}
        <div className="absolute -inset-4 bg-[#00d4ff]/10 rounded-3xl blur-3xl opacity-40" />
        
        {/* Main image container - ROUNDED RECTANGLE */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00d4ff]/10">
          <img
            src="/profile.jpg"
            alt="Mehraj U Din Mir"
            className="w-full h-full object-cover transition-all duration-700"
            style={{ 
              filter: isHovered ? 'brightness(1.1) saturate(1.1)' : 'brightness(1)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 via-transparent to-[#00f5d4]/10" />
          
          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#00d4ff]/30 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#00f5d4]/30 rounded-br-3xl" />
        </div>

        {/* Floating badge on image */}
        <motion.div
          className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-[#0a0a0f]/90 backdrop-blur-xl border border-[#00d4ff]/30 text-xs font-semibold text-[#00d4ff] flex items-center gap-2"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          Available for Work
        </motion.div>

        {/* Decorative dots around image */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#00d4ff]"
            style={{
              top: `${10 + i * 20}%`,
              left: i % 2 === 0 ? '-12px' : 'auto',
              right: i % 2 === 1 ? '-12px' : 'auto',
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════
// PARTICLE NETWORK BACKGROUND
// ════════════════════════════════════════════════════════════
function ParticleNetwork() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      color: ['#00d4ff', '#00f5d4', '#a78bfa', '#ffffff'][Math.floor(Math.random() * 4)],
      opacity: Math.random() * 0.5 + 0.2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      particles.forEach((p, i) => {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200) {
          const force = (200 - dist) / 200
          p.vx += dx * force * 0.0008
          p.vy += dy * force * 0.0008
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          
          if (dist2 < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#00d4ff'
            ctx.globalAlpha = (1 - dist2 / 120) * 0.15
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
}

// ════════════════════════════════════════════════════════════
// MAIN HERO - IMAGE LEFT, TEXT RIGHT
// ════════════════════════════════════════════════════════════
export default function Hero() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 250])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: '100px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
      <ParticleNetwork />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${300 + i * 80}px`,
              height: `${300 + i * 80}px`,
              left: `${5 + i * 20}%`,
              top: `${5 + (i % 3) * 30}%`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ zIndex: 3 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]" />
      </div>

      {/* Main Content - TWO COLUMN LAYOUT */}
      <motion.div
        className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto w-full"
        style={{ y, opacity, scale }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT SIDE - IMAGE */}
          <div className="flex-shrink-0">
            <ProfileImage />
          </div>

          {/* RIGHT SIDE - TEXT CONTENT */}
          <div className="flex-1 text-center lg:text-left">
            {/* Floating Badges */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
              style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
            >
              <TiltBadge text="AI Developer" icon={Brain} delay={0.4} />
              <TiltBadge text="Full Stack" icon={Cpu} delay={0.5} />
              <TiltBadge text="Educator" icon={Globe} delay={0.6} />
              <TiltBadge text="Content Creator" icon={Eye} delay={0.7} />
            </motion.div>

            {/* Name */}
            <div className="mb-6">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white"
                    style={{ 
                      letterSpacing: '-0.05em',
                      lineHeight: 0.95,
                      textShadow: '0 0 60px rgba(0,212,255,0.4), 0 0 100px rgba(0,212,255,0.2), 0 0 140px rgba(0,212,255,0.1)'
                    }}
                  >
                    Mehraj U Din
                  </h1>
                </motion.div>
              </div>

              <div className="overflow-hidden mt-1">
                <motion.div
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black tracking-tighter inline-block"
                    style={{ 
                      letterSpacing: '-0.05em',
                      lineHeight: 0.95,
                      background: 'linear-gradient(135deg, #00d4ff 0%, #00f5d4 25%, #a5f3fc 50%, #00f5d4 75%, #00d4ff 100%)',
                      backgroundSize: '300% 300%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent',
                      filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.6)) drop-shadow(0 0 80px rgba(0,245,212,0.4))',
                      animation: 'gradient-shift 4s ease infinite'
                    }}
                  >
                    Mir
                  </h1>
                </motion.div>
              </div>
            </div>

            {/* Glitch Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mb-6"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/40 font-light max-w-xl tracking-wider font-mono">
                <GlitchText text="Building Intelligent Solutions with AI & Technology" delay={1400} />
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="text-white/25 text-sm md:text-base max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Transforming ideas into intelligent digital experiences through
              Artificial Intelligence, Web Development, and Innovation from Srinagar, Kashmir.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-5"
            >
              <MagneticButton onClick={scrollToProjects} variant="primary">
                <Sparkles className="w-5 h-5" />
                Explore Projects
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton onClick={scrollToContact} variant="secondary">
                <Zap className="w-5 h-5" />
                Get In Touch
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0"
            >
              {[
                { value: '50+', label: 'AI Projects' },
                { value: '1000+', label: 'Students Trained' },
                { value: '5+', label: 'Years Experience' },
                { value: '20+', label: 'Technologies' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.0 + i * 0.15, type: 'spring' }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  className="text-center group cursor-default relative"
                >
                  <div className="absolute inset-0 bg-[#00d4ff]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div 
                      className="text-xl md:text-2xl font-black"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff, #00f5d4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                        filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.5))'
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/25 uppercase tracking-widest mt-1 group-hover:text-white/50 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-white/15 text-[10px] tracking-[0.3em] uppercase font-light">Scroll to explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#00d4ff]/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-24 left-6 z-10 opacity-20 pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-14 h-14 border border-[#00d4ff]/30 rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border border-[#00f5d4]/20 rounded-full absolute top-3 left-3" />
      </div>
      <div className="absolute bottom-8 right-6 z-10 opacity-20 pointer-events-none">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-[#00f5d4]/30 rounded-full" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="w-10 h-10 border border-[#00d4ff]/20 rounded-full absolute top-3 left-3" />
      </div>
    </section>
  )
}