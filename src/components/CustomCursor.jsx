import React, { useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const dotX = useSpring(0, { damping: 50, stiffness: 500 })
  const dotY = useSpring(0, { damping: 50, stiffness: 500 })

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const handleMouseEnter = () => {
      cursorRef.current?.classList.add('scale-150')
    }
    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove('scale-150')
    }

    window.addEventListener('mousemove', moveCursor)

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY, dotX, dotY])

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-electric-blue/50 transition-transform duration-300" />
      </motion.div>
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-full h-full rounded-full bg-electric-blue" />
      </motion.div>
    </>
  )
}