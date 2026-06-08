import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Users, Code, BookOpen, MapPin, Calendar, ChevronRight } from 'lucide-react'

const stats = [
  { icon: Code, value: 50, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 1000, suffix: '+', label: 'Students Trained' },
  { icon: Award, value: 5, suffix: '+', label: 'Years Experience' },
  { icon: BookOpen, value: 100, suffix: '+', label: 'AI Models Built' },
]

const timeline = [
  {
    year: '2020',
    title: 'Started AI Journey',
    description: 'Began exploring Machine Learning and Computer Vision, building foundational projects in Python and TensorFlow.',
  },
  {
    year: '2021',
    title: 'Full Stack Development',
    description: 'Expanded into web development with React, Node.js, and modern frameworks while continuing AI research.',
  },
  {
    year: '2022',
    title: 'Founded CoveIQ',
    description: 'Launched CoveIQ - an AI-powered business solutions platform for automation and analytics.',
  },
  {
    year: '2023',
    title: 'AI Education & Training',
    description: 'Started training programs in Computational Thinking and AI, reaching 1000+ students across Kashmir.',
  },
  {
    year: '2024',
    title: 'Content Creation & Consulting',
    description: 'Expanded into technology consulting and content creation, helping businesses with digital transformation.',
  },
]

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 text-center group hover:border-electric-blue/30 transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-electric-blue/20 transition-colors">
        <stat.icon className="w-6 h-6 text-electric-blue" />
      </div>
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
        {isInView ? `${stat.value}${stat.suffix}` : `0${stat.suffix}`}
      </div>
      <div className="text-sm text-white/50">{stat.label}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Story Behind <span className="gradient-text">The Code</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            An AI enthusiast, educator, and developer combining technology with innovation 
            to create practical solutions for businesses and students.
          </p>
        </motion.div>

        {/* Profile & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-neon-cyan/20 rounded-3xl blur-2xl" />
              <div className="relative glass-card rounded-3xl p-8 flex flex-col items-center border border-white/10">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-electric-blue/30 mb-6">
                  <img
                    src="/profile.jpg"
                    alt="Mehraj U Din Mir"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Mehraj U Din Mir</h3>
                <p className="text-white/50 text-sm mb-4">AI Developer & Educator</p>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Srinagar, Jammu & Kashmir, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4 mb-8">
              <p className="text-white/70 leading-relaxed">
                I am an AI enthusiast, educator, and developer who combines Artificial Intelligence, 
                Web Development, Automation, and Modern Technology to create practical solutions for 
                businesses, students, and organizations.
              </p>
              <p className="text-white/70 leading-relaxed">
                My work spans across AI Applications, Machine Learning Projects, Computer Vision Systems, 
                SaaS Platforms, Educational Technology, and Digital Transformation Solutions. I believe 
                in making technology accessible and impactful.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Career <span className="gradient-text">Journey</span>
          </h3>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue/50 via-neon-cyan/30 to-transparent md:-translate-x-1/2" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-electric-blue border-4 border-deep-black md:-translate-x-1/2 z-10 mt-1.5">
                <div className="absolute inset-0 rounded-full bg-electric-blue animate-ping opacity-30" />
              </div>

              <div className={`ml-12 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}>
                <div className="glass-card rounded-2xl p-6 hover:border-electric-blue/20 transition-all duration-500 group">
                  <div className={`flex items-center gap-2 mb-3 ${
                    index % 2 === 0 ? 'md:justify-end' : ''
                  }`}>
                    <Calendar className="w-4 h-4 text-electric-blue" />
                    <span className="text-electric-blue font-semibold">{item.year}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-electric-blue transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}