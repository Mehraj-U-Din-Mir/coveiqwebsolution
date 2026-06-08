import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const technologies = [
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'Next.js', category: 'Frontend', level: 90 },
  { name: 'TypeScript', category: 'Frontend', level: 88 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 92 },
  { name: 'JavaScript', category: 'Frontend', level: 93 },
  { name: 'HTML5/CSS3', category: 'Frontend', level: 95 },
  { name: 'Python', category: 'Backend', level: 95 },
  { name: 'Node.js', category: 'Backend', level: 90 },
  { name: 'Express.js', category: 'Backend', level: 88 },
  { name: 'Flask', category: 'Backend', level: 85 },
  { name: 'FastAPI', category: 'Backend', level: 82 },
  { name: 'PostgreSQL', category: 'Database', level: 85 },
  { name: 'MongoDB', category: 'Database', level: 88 },
  { name: 'MySQL', category: 'Database', level: 82 },
  { name: 'Python', category: 'AI/ML', level: 95 },
  { name: 'TensorFlow', category: 'AI/ML', level: 88 },
  { name: 'PyTorch', category: 'AI/ML', level: 85 },
  { name: 'OpenCV', category: 'AI/ML', level: 90 },
  { name: 'Scikit-Learn', category: 'AI/ML', level: 87 },
  { name: 'NLP', category: 'AI/ML', level: 82 },
  { name: 'Generative AI', category: 'AI/ML', level: 85 },
  { name: 'Git', category: 'Tools', level: 92 },
  { name: 'GitHub', category: 'Tools', level: 92 },
  { name: 'Docker', category: 'Tools', level: 80 },
  { name: 'Linux', category: 'Tools', level: 85 },
  { name: 'VS Code', category: 'Tools', level: 95 },
]

const categories = ['All', 'Frontend', 'Backend', 'Database', 'AI/ML', 'Tools']

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('All')
  const containerRef = useRef(null)

  const filteredTech = activeCategory === 'All' 
    ? technologies 
    : technologies.filter(t => t.category === activeCategory)

  return (
    <section id="techstack" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Technology</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A comprehensive arsenal of modern technologies powering AI solutions and web applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          ref={containerRef}
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="glass-card rounded-xl p-4 text-center border border-white/5 hover:border-electric-blue/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-electric-blue/10 transition-colors">
                    <span className="text-lg font-bold gradient-text">
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    {tech.name}
                  </h4>
                  <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-electric-blue to-neon-cyan"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                    />
                  </div>
                  <span className="text-xs text-white/30 mt-1">{tech.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// export default TechStack