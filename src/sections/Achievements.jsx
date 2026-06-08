import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Award, Star, Target, TrendingUp, Users, BookOpen, Globe } from 'lucide-react'

const achievements = [
  {
    icon: Trophy,
    title: 'AI Innovation Award',
    description: 'Recognized for innovative AI solutions in the Kashmir tech ecosystem',
    year: '2024',
  },
  {
    icon: Users,
    title: '1000+ Students Trained',
    description: 'Successfully trained over 1000 students in AI and Computational Thinking',
    year: '2023-2024',
  },
  {
    icon: Globe,
    title: 'CoveIQ Platform Launch',
    description: 'Launched AI-powered business automation platform serving 25+ clients',
    year: '2022',
  },
  {
    icon: Target,
    title: 'Computer Vision Expertise',
    description: 'Built real-time emotion detection with 94% accuracy using Deep Learning',
    year: '2023',
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation Leader',
    description: 'Helped 50+ local businesses automate and digitize their operations',
    year: '2022-2024',
  },
  {
    icon: BookOpen,
    title: 'EdTech Pioneer',
    description: 'Created interactive AI learning platforms with personalized tutoring systems',
    year: '2023',
  },
  {
    icon: Star,
    title: 'Content Creator Impact',
    description: 'Built a thriving tech education community through YouTube and social media',
    year: '2023-2024',
  },
  {
    icon: Award,
    title: 'Full Stack Mastery',
    description: 'Delivered 50+ end-to-end projects using React, Node.js, and AI integration',
    year: '2020-2024',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Achievements</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Milestones & <span className="gradient-text">Recognition</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Key accomplishments and impact metrics that define my journey in technology and education.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full border border-white/5 hover:border-electric-blue/20 transition-all duration-500 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center mb-4 group-hover:bg-electric-blue/20 transition-colors">
                    <achievement.icon className="w-6 h-6 text-electric-blue" />
                  </div>

                  <span className="text-xs text-white/30 font-mono mb-2 block">{achievement.year}</span>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-electric-blue transition-colors">
                    {achievement.title}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// export default Achievements