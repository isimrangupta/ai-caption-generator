'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// ── Typing Animation Text ──
const TEXTS = [
  'for Instagram 📸',
  'for YouTube 🎥',
  'for Twitter 🐦',
  'for LinkedIn 💼',
  'in Seconds ⚡',
]

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  // Typing Effect
  useEffect(() => {
    const current = TEXTS[textIndex]

    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 30)
        return () => clearTimeout(t)
      } else {
        setTextIndex((i) => (i + 1) % TEXTS.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, textIndex])

  return (
    <section
      className="relative w-full overflow-hidden
                 min-h-screen
                 bg-[#f5f3ff] dark:bg-gray-950
                 flex items-center justify-center
                 transition-colors duration-300"
    >

      {/* ── Animated Background Blobs ── */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-100px] left-[-100px]
                   w-[500px] h-[500px]
                   bg-purple-400/25 dark:bg-purple-600/20
                   rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-100px] right-[-100px]
                   w-[500px] h-[500px]
                   bg-pink-400/25 dark:bg-pink-600/20
                   rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2
                   -translate-x-1/2 -translate-y-1/2
                   w-[700px] h-[700px]
                   bg-indigo-300/10 dark:bg-indigo-500/10
                   rounded-full blur-3xl pointer-events-none"
      />

      {/* ── Floating Dots ── */}
      {[
        { top: '15%', left: '8%',  size: 'w-3 h-3',  delay: 0   },
        { top: '25%', left: '88%', size: 'w-2 h-2',  delay: 0.5 },
        { top: '65%', left: '5%',  size: 'w-2 h-2',  delay: 1   },
        { top: '75%', left: '90%', size: 'w-3 h-3',  delay: 1.5 },
        { top: '40%', left: '92%', size: 'w-1.5 h-1.5', delay: 2 },
        { top: '85%', left: '20%', size: 'w-2 h-2',  delay: 2.5 },
        { top: '10%', left: '50%', size: 'w-1.5 h-1.5', delay: 3 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
          className={`absolute ${dot.size} ${dot.top}
                      rounded-full
                      bg-purple-500 dark:bg-purple-400
                      pointer-events-none`}
          style={{ top: dot.top, left: dot.left }}
        />
      ))}

      {/* ── Grid Pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2
                     bg-white/80 dark:bg-gray-800/80
                     backdrop-blur-md
                     border border-purple-200 dark:border-purple-700
                     text-purple-600 dark:text-purple-300
                     text-sm font-semibold
                     px-5 py-2.5 rounded-full
                     mb-8 shadow-lg shadow-purple-500/10"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            ✨
          </motion.span>
          Generate. Share. Go Viral.
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl
                     font-extrabold leading-tight mb-4"
        >
          <span className="text-gray-800 dark:text-white">
            AI Captions
          </span>

          <br />

          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="bg-gradient-to-r
                       from-purple-600 via-pink-500
                       to-indigo-500
                       bg-[length:200%_auto]
                       bg-clip-text text-transparent"
          >
            {displayed}
            {/* Cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="text-purple-500"
            >
              |
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-gray-500 dark:text-gray-400
                     text-lg md:text-xl
                     max-w-2xl mx-auto mb-12
                     leading-relaxed"
        >
          Upload any image — our AI instantly creates
          <span className="text-purple-500 font-semibold"> creative</span>,
          <span className="text-pink-500 font-semibold"> engaging</span>, and
          <span className="text-indigo-500 font-semibold"> viral</span> captions
          with hashtags and emojis 🚀
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row
                     items-center justify-center gap-4 mb-16"
        >

          {/* Primary */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/register"
              className="relative overflow-hidden
                         inline-flex items-center gap-2
                         bg-gradient-to-r from-purple-600 to-pink-500
                         text-white font-bold
                         px-10 py-4 rounded-2xl
                         shadow-2xl shadow-purple-500/40
                         hover:shadow-purple-500/60
                         transition-all duration-300
                         text-base"
            >
              <motion.div
                animate={{ x: ['-100%', '250%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1 }}
                className="absolute inset-0
                           bg-gradient-to-r
                           from-transparent via-white/30 to-transparent
                           skew-x-12"
              />
              ✦ Start For Free
            </Link>
          </motion.div>

          {/* Secondary */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2
                         bg-white dark:bg-gray-800
                         border-2 border-gray-200 dark:border-gray-700
                         hover:border-purple-400 dark:hover:border-purple-500
                         text-gray-700 dark:text-white
                         font-bold px-10 py-4 rounded-2xl
                         shadow-lg hover:shadow-xl
                         transition-all duration-300 text-base"
            >
              🔐 Login
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex items-center justify-center
                     gap-6 md:gap-16 flex-wrap"
        >
          {[
            { number: '50+', label: 'Captions Generated', icon: '✨' },
            { number: '100+',  label: 'Happy Users',        icon: '😊' },
            { number: '2s',   label: 'Generation Time',    icon: '⚡' },
            { number: '99%',  label: 'Accuracy',           icon: '🎯' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center group cursor-default"
            >
              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                className="text-3xl md:text-4xl font-extrabold
                           bg-gradient-to-r from-purple-600 to-pink-500
                           bg-clip-text text-transparent"
              >
                {stat.icon} {stat.number}
              </motion.p>
              <p className="text-gray-500 dark:text-gray-400
                            text-sm mt-1 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Down Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1
                       text-gray-400 dark:text-gray-600"
          >
            <span className="text-xs font-medium">Try it below</span>
            <svg
              className="w-5 h-5"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}