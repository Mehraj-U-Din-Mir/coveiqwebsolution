import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import { ExternalLink, Github, Eye, ArrowUpRight, Code2, Brain, Camera, Globe, GraduationCap } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Real Emotion Detection System',
    description: 'Live camera-based emotion analysis using Deep Learning and Computer Vision. Real-time facial expression recognition with Flask backend for seamless integration.',
    image: 'emotion',
    icon: Camera,
    color: '#00d4ff',
    tags: ['Deep Learning', 'Computer Vision', 'Flask', 'OpenCV', 'Python'],
    stats: { accuracy: '94%', latency: '30ms', users: '500+' },
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    id: 2,
    title: 'CoveIQ',
    description: 'AI-powered business solutions platform featuring smart automation, advanced analytics, and seamless AI integration for enterprise clients.',
    image: 'coveiq',
    icon: Brain,
    color: '#00f5d4',
    tags: ['AI/ML', 'React', 'Node.js', 'PostgreSQL', 'Analytics'],
    stats: { clients: '25+', automation: '80%', efficiency: '3x' },
    github: 'https://github.com',
    demo: 'https://coveiq.com',
    featured: true,
  },
  {
    id: 3,
    title: 'AI Website Builder',
    description: 'Automated website generation platform for local businesses. AI-driven business optimization and lead generation with intelligent content creation.',
    image: 'website',
    icon: Globe,
    color: '#00d4ff',
    tags: ['Generative AI', 'Next.js', 'Tailwind', 'OpenAI', 'Automation'],
    stats: { websites: '100+', businesses: '50+', leads: '2000+' },
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
  {
    id: 4,
    title: 'Educational AI Platforms',
    description: 'Student learning systems with interactive education and AI-powered assistance. Personalized learning paths and intelligent tutoring systems.',
    image: 'education',
    icon: GraduationCap,
    color: '#00f5d4',
    tags: ['EdTech', 'AI Tutoring', 'React', 'Python', 'NLP'],
    stats: { students: '1000+', courses: '50+', satisfaction: '96%' },
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Computer Vision Applications',
    description: 'Advanced face detection, object recognition, and intelligent monitoring systems. Real-time video analysis for security and automation.',
    image: 'vision',
    icon: Code2,
    color: '#00d4ff',
    tags: ['OpenCV', 'YOLO', 'TensorFlow', 'Real-time', 'IoT'],
    stats: { accuracy: '92%', fps: '60', systems: '10+' },
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-150, 150], [8, -8])
  const rotateY = useTransform(x, [-150, 150], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const glareX = useTransform(x, [-150, 150], [0, 100])
  const glareY = useTransform(y, [-150, 150], [0, 100])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const Icon = project.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={`group relative ${project.featured ? 'md:col-span-2' : ''}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-electric-blue/20 transition-all duration-500 h-full"
      >
        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0,212,255,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Image/Visual Area */}
        <div className={`relative overflow-hidden ${project.featured ? 'h-64 md:h-80' : 'h-48'}`}>
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-20"
            style={{ 
              background: `linear-gradient(135deg, ${project.color}20, transparent)` 
            }}
          />

          {/* Animated background pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: project.color,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Icon & Title overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
            >
              <Icon className="w-8 h-8" style={{ color: project.color }} />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-white text-center">{project.title}</h3>
          </div>

          {/* Stats overlay on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-deep-black to-transparent"
          >
            <div className="flex justify-center gap-6">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold" style={{ color: project.color }}>{value}</div>
                  <div className="text-xs text-white/40 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-white/50 hover:border-electric-blue/30 hover:text-electric-blue transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:border-electric-blue/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ 
                background: `${project.color}15`, 
                border: `1px solid ${project.color}30`,
                color: project.color 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
              Live Demo
              <ArrowUpRight className="w-3 h-3" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A showcase of AI-powered applications, web platforms, and innovative solutions 
            built with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// export default Projects