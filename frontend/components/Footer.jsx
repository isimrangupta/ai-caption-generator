'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden
                       bg-[#0d0d1a] text-white
                       border-t border-white/10
                       py-12 px-6">

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                      w-[400px] h-[200px]
                      bg-purple-600/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row
                        items-center justify-between gap-8">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-9 h-9 rounded-xl
                         bg-gradient-to-br from-purple-500 to-pink-500
                         flex items-center justify-center
                         text-white font-bold
                         shadow-lg shadow-purple-500/40"
            >
              ✦
            </motion.div>
            <span className="font-extrabold text-lg">
              AI{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400
                               bg-clip-text text-transparent">
                Caption
              </span>
            </span>
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link href="/login" className="hover:text-purple-400 transition-colors">
              Login
            </Link>
            <Link href="/register" className="hover:text-purple-400 transition-colors">
              Register
            </Link>
            <Link href="/dashboard" className="hover:text-purple-400 transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['Next.js', 'Tailwind', 'Gemini AI', 'MongoDB'].map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="text-xs px-3 py-1 rounded-full
                           bg-white/5 border border-white/10
                           text-gray-400"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 AI Caption Generator. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made with ❤️ using{' '}
            <span className="text-purple-400">Next.js</span>
            {' '}+{' '}
            <span className="text-pink-400">Gemini AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}