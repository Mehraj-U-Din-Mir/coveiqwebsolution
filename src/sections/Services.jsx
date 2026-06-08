import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import { Brain, Code2, Bot, GraduationCap, Globe, BarChart3, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Brain,
    title: 'AI Development',
    description: 'Custom AI solutions including machine learning models, NLP systems, and intelligent automation tailored to your business needs.',
    features: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
    color: '#00d4ff',
  },
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'End-to-end web application development using modern frameworks and technologies with scalable architecture.',
    features: ['React/Next.js', 'Node.js', 'Database Design', 'API Development'],
    color: '#00f5d4',
  },
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Intelligent automation solutions that streamline workflows, reduce manual tasks, and boost productivity.',
    features: ['Process Automation', 'Chatbots', 'Data Processing', 'Integration'],
    color: '#00d4ff',
  },
  {
    icon: GraduationCap,
    title: 'Educational Technology',
    description: 'AI-powered learning platforms, interactive education tools, and personalized tutoring systems.',
    features: ['Learning Platforms', 'AI Tutoring', 'Interactive Content', 'Assessment Tools'],
    color: '#00f5d4',
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Modern, responsive websites and web applications with AI integration and optimized performance.',
    features: ['Responsive Design', 'SEO Optimized', 'Performance', 'Accessibility'],
    color: '#00d4ff',
  },
  {
    icon: BarChart3,
    title: 'Business Digitalization',
    description: 'Complete digital transformation services to modernize operations and leverage AI capabilities.',
    features: ['Digital Strategy', 'Cloud Migration', 'Data Analytics', 'Workflow Optimization'],
    color: '#00f5d4',
  },
  {
    icon: MessageSquare,
    title: 'AI Consulting',
    description: 'Strategic AI consulting to identify opportunities, plan implementations, and maximize ROI.',
    features: ['AI Strategy', 'Feasibility Analysis', 'Implementation Roadmap', 'Training'],
    color: '#00d4ff',
  },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

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

  const Icon = service.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
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
        className="glass-card rounded-2xl p-6 h-full border border-white/5 hover:border-electric-blue/20 transition-all duration-500 relative overflow-hidden cursor-pointer"
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 70%)`,
          }}
        />

        <div className="relative">
          {/* Icon */}
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
            style={{ 
              background: `${service.color}15`, 
              border: `1px solid ${service.color}30` 
            }}
          >
            <Icon className="w-7 h-7" style={{ color: service.color }} />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 group-hover:text-electric-blue transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/40 border border-white/5"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: service.color }}
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Premium technology services combining AI expertise with full-stack development 
            to deliver transformative solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// export default Services