import React from 'react'
import { motion } from 'framer-motion'
import { Youtube, Play, Eye, ThumbsUp, Users, TrendingUp } from 'lucide-react'

const videos = [
  {
    id: 1,
    title: 'Building AI Emotion Detection from Scratch',
    views: '12K',
    likes: '850',
    duration: '18:45',
    thumbnail: 'AI',
  },
  {
    id: 2,
    title: 'Full Stack AI SaaS Platform Tutorial',
    views: '8.5K',
    likes: '620',
    duration: '32:10',
    thumbnail: 'SaaS',
  },
  {
    id: 3,
    title: 'Computer Vision with OpenCV & Python',
    views: '15K',
    likes: '1.2K',
    duration: '25:30',
    thumbnail: 'CV',
  },
  {
    id: 4,
    title: 'AI for Beginners: Complete Roadmap 2024',
    views: '22K',
    likes: '1.8K',
    duration: '45:00',
    thumbnail: 'Roadmap',
  },
]

const stats = [
  { icon: Users, value: '10K+', label: 'Subscribers' },
  { icon: Play, value: '50+', label: 'Videos' },
  { icon: Eye, value: '500K+', label: 'Total Views' },
  { icon: ThumbsUp, value: '25K+', label: 'Likes' },
]

export default function YouTube() {
  return (
    <section id="youtube" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-400 text-sm font-medium tracking-widest uppercase mb-4 block">Content Creation</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            YouTube <span className="text-red-400">Channel</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Educational content on AI, programming, and technology. Building a community of learners 
            and tech enthusiasts.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-4 text-center border border-white/5"
            >
              <stat.icon className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-red-400/20 transition-all duration-500">
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-red-500/10 to-transparent flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-30" />

                  <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <Play className="w-8 h-8 text-red-400 fill-red-400 ml-1" />
                  </div>

                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-xs text-white/70">
                    {video.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {video.likes}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://www.youtube.com/@coveiqkashmir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-red-500/10 border border-red-400/20 text-red-400 font-medium hover:bg-red-500/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Youtube className="w-5 h-5" />
            Subscribe to Channel
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// export default YouTube