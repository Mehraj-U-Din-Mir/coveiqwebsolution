import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react'

const experiences = [
  {
    title: 'AI Developer & Founder',
    company: 'CoveIQ',
    location: 'Srinagar, Kashmir',
    period: '2022 - Present',
    description: 'Founded and developed CoveIQ, an AI-powered business solutions platform. Leading AI automation, smart analytics, and business intelligence integration for clients.',
    skills: ['AI/ML', 'Python', 'React', 'Node.js', 'PostgreSQL'],
    current: true,
  },
  {
    title: 'Full Stack Developer',
    company: 'Freelance & Consulting',
    location: 'Remote / Kashmir',
    period: '2020 - Present',
    description: 'Developing full-stack web applications, SaaS platforms, and AI-integrated solutions for businesses. Specializing in modern web technologies and AI automation.',
    skills: ['React', 'Next.js', 'TypeScript', 'Flask', 'MongoDB'],
    current: true,
  },
  {
    title: 'AI Trainer & Educator',
    company: 'Independent',
    location: 'Srinagar, Kashmir',
    period: '2021 - Present',
    description: 'Training 1000+ students in Computational Thinking and Artificial Intelligence. Conducting workshops, bootcamps, and online courses on AI, ML, and modern tech.',
    skills: ['Python', 'TensorFlow', 'Teaching', 'Curriculum Design'],
    current: true,
  },
  {
    title: 'Content Creator',
    company: 'YouTube & Social Media',
    location: 'Kashmir, India',
    period: '2023 - Present',
    description: 'Creating educational content on AI, programming, and technology. Building a community of learners and tech enthusiasts through video tutorials and live sessions.',
    skills: ['Content Creation', 'Video Editing', 'Community Building'],
    current: true,
  },
  {
    title: 'Technology Consultant',
    company: 'Various Clients',
    location: 'India',
    period: '2022 - Present',
    description: 'Providing digital transformation consulting, AI strategy, and technology implementation guidance for local businesses and startups.',
    skills: ['AI Consulting', 'Digital Strategy', 'Business Analysis'],
    current: true,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-electric-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Experience</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A diverse career spanning AI development, education, content creation, and technology consulting.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 hover:border-electric-blue/20 transition-all duration-500 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      exp.current 
                        ? 'bg-electric-blue/10 border border-electric-blue/30' 
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <Briefcase className={`w-6 h-6 ${exp.current ? 'text-electric-blue' : 'text-white/50'}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-electric-blue transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-white/60 text-sm">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/50 hover:border-electric-blue/30 hover:text-electric-blue transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Current indicator */}
                  {exp.current && (
                    <div className="hidden md:flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                      <span className="text-xs text-neon-cyan">Current</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// export default Experience