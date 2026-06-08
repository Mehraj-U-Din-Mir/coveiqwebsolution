import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-deep-black flex flex-col items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
              <span className="gradient-text">Mehraj U Din Mir</span>
            </h1>

            <div className="w-64 md:w-80 h-1 bg-graphite rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-blue to-neon-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.p
              className="text-electric-blue/60 text-sm font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.min(Math.round(progress), 100)}% Loading Experience...
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 30% 50%, rgba(0,212,255,0.03) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 50%, rgba(0,245,212,0.03) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 50%, rgba(0,212,255,0.03) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}