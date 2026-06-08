import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Ahmad Khan',
    role: 'Business Owner',
    company: 'Kashmir Crafts',
    content: 'Mehraj transformed our business with CoveIQ. The AI automation reduced our manual work by 80% and the analytics dashboard gives us insights we never had before. Truly exceptional work.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Fatima Bhat',
    role: 'Student',
    company: 'University of Kashmir',
    content: 'The AI training program was transformative. Mehraj has a unique ability to explain complex concepts simply. I went from zero knowledge to building my own ML models in just 3 months.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Rahul Sharma',
    role: 'Tech Lead',
    company: 'Startup India',
    content: 'Working with Mehraj on our computer vision project was incredible. The emotion detection system achieved 94% accuracy and integrated seamlessly with our existing infrastructure.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sara Malik',
    role: 'Educator',
    company: 'Digital Kashmir',
    content: 'The educational AI platform Mehraj built for us has revolutionized how we teach. Students are more engaged, and the personalized learning paths have improved outcomes significantly.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Imran Hussain',
    role: 'Founder',
    company: 'Local Business Network',
    content: "Mehraj's AI website builder helped us launch 20+ business websites in weeks. The lead generation features alone have increased our client inquiries by 300%. Outstanding service.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[150px] -translate-x-1/2" />
      </div>

      <div className="relative section-padding max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Client <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Feedback from businesses, students, and collaborators who have experienced the impact of my work.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl p-8 md:p-12 border border-white/5"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue/20 to-neon-cyan/20 flex items-center justify-center mb-6 border border-electric-blue/20">
                    <Quote className="w-8 h-8 text-electric-blue" />
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
                    "{testimonials[current].content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue/30 to-neon-cyan/30 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {testimonials[current].name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white">{testimonials[current].name}</h4>
                      <p className="text-sm text-white/40">
                        {testimonials[current].role} at {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-electric-blue hover:border-electric-blue/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-electric-blue' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-electric-blue hover:border-electric-blue/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

// export default Testimonials