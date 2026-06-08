import React, { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useCountUp } from 'react-countup'

const skillCategories = [
  {
    name: 'Frontend',
    icon: '💻',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'JavaScript', level: 93 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 80 },
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'Flask', level: 85 },
      { name: 'FastAPI', level: 82 },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 88 },
      { name: 'MySQL', level: 82 },
    ],
  },
  {
    name: 'AI & ML',
    icon: '🧠',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'TensorFlow', level: 88 },
      { name: 'PyTorch', level: 85 },
      { name: 'OpenCV', level: 90 },
      { name: 'Scikit-Learn', level: 87 },
      { name: 'NLP', level: 82 },
      { name: 'Generative AI', level: 85 },
    ],
  },
  {
    name: 'Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'Docker', level: 80 },
      { name: 'Linux', level: 85 },
      { name: 'VS Code', level: 95 },
    ],
  },
]

function CircularProgress({ value, label, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 2, delay: delay * 0.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#00f5d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold gradient-text">
            {isInView ? <CountUp end={value} suffix="%" duration={2} /> : '0%'}
          </span>
        </div>
      </div>
      <span className="text-xs text-white/50 mt-2">{label}</span>
    </motion.div>
  )
}

function LinearProgress({ value, label, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/70 group-hover:text-electric-blue transition-colors">
          {label}
        </span>
        <span className="text-sm text-white/40">
          {isInView ? <CountUp end={value} suffix="%" duration={2} /> : '0%'}
        </span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-electric-blue to-neon-cyan"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay * 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

function CountUp({ end, suffix, duration }) {
  const ref = useRef(null)
  const { countUp } = useCountUp({
    ref: ref,
    start: 0,
    end: end,
    duration: duration,
    suffix: suffix,
  })
  return <span ref={ref} />
}

function SkillCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      className="glass-card rounded-2xl p-6 border border-white/5 hover:border-electric-blue/20 transition-all duration-500"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-xl font-bold">{category.name}</h3>
      </div>
      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <LinearProgress
            key={skill.name}
            value={skill.level}
            label={skill.name}
            delay={i * 0.1}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Skills</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A comprehensive toolkit spanning AI/ML, full-stack development, and modern technologies 
            built through years of hands-on experience.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.name} category={category} index={i} />
          ))}
        </div>

        {/* Top Skills Circular */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            Core <span className="gradient-text">Competencies</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: 'AI/ML', value: 95 },
              { name: 'React', value: 95 },
              { name: 'Python', value: 95 },
              { name: 'Computer Vision', value: 90 },
              { name: 'Full Stack', value: 88 },
              { name: 'Cloud/DevOps', value: 82 },
            ].map((skill, i) => (
              <CircularProgress
                key={skill.name}
                value={skill.value}
                label={skill.name}
                delay={i * 0.15}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// export default Skills