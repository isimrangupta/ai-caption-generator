'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Cookie check
  useEffect(() => {
    const token = Cookies.get('token')
    setIsLoggedIn(!!token)
  }, [pathname])

  // Theme
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      setIsDark(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  const handleLogout = () => {
    Cookies.remove('token')
    setIsLoggedIn(false)
    setMobileOpen(false)
    router.push('/logout')
  }

  if (!mounted) return null

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50
                    transition-all duration-500
                    ${scrolled
                      ? 'bg-[#0d0d1a]/95 backdrop-blur-2xl shadow-2xl shadow-purple-500/10 py-3'
                      : 'bg-[#0d0d1a] py-4'
                    }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5"
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
              <span className="font-extrabold text-base text-white">
                AI{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400
                                 bg-clip-text text-transparent">
                  Caption
                </span>
              </span>
            </motion.div>
          </Link>

          {/* ── Desktop Center Links ── */}
          <div className="hidden md:flex items-center gap-1
                          bg-white/5 border border-white/10
                          rounded-2xl px-2 py-1.5">

            {/* Home — Hamesha */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-xl
                            text-sm font-semibold transition-all duration-300
                            ${pathname === '/'
                              ? 'text-white'
                              : 'text-gray-400 hover:text-white'
                            }`}
              >
                {pathname === '/' && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 rounded-xl
                               bg-gradient-to-r from-purple-600/50 to-pink-600/50
                               border border-purple-500/30"
                  />
                )}
                <span className="relative z-10">🏠 Home</span>
              </motion.div>
            </Link>

            {/* Dashboard — Sirf Login hone par */}
            {isLoggedIn && (
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-xl
                              text-sm font-semibold transition-all duration-300
                              ${pathname === '/dashboard'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                              }`}
                >
                  {pathname === '/dashboard' && (
                    <motion.div
                      layoutId="pill"
                      className="absolute inset-0 rounded-xl
                                 bg-gradient-to-r from-purple-600/50 to-pink-600/50
                                 border border-purple-500/30"
                    />
                  )}
                  <span className="relative z-10">✨ Dashboard</span>
                </motion.div>
              </Link>
            )}

            {/* Login — Sirf Logged OUT par */}
            {!isLoggedIn && (
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-xl
                              text-sm font-semibold transition-all duration-300
                              ${pathname === '/login'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                              }`}
                >
                  {pathname === '/login' && (
                    <motion.div
                      layoutId="pill"
                      className="absolute inset-0 rounded-xl
                                 bg-gradient-to-r from-purple-600/50 to-pink-600/50
                                 border border-purple-500/30"
                    />
                  )}
                  <span className="relative z-10">🔐 Login</span>
                </motion.div>
              </Link>
            )}

          </div>

          {/* ── Desktop Right Side ── */}
          <div className="hidden md:flex items-center gap-3">

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-14 h-7 rounded-full
                         bg-white/10 border border-white/20
                         flex items-center px-1"
              aria-label="Toggle theme"
            >
              <motion.span
                animate={{ x: isDark ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-5 h-5 rounded-full bg-white shadow-md
                           flex items-center justify-center"
              >
                {!isDark ? (
                  <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 15a5 5 0 100-10 5 5 0 000 10zm7-5a1 1 0 011 1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-14 0a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM5.22 4.81a1 1 0 011.42 0l.7.7a1 1 0 11-1.42 1.42l-.7-.7a1 1 0 010-1.42zm12.02 12.02a1 1 0 011.42 0l.7.7a1 1 0 11-1.42 1.42l-.7-.7a1 1 0 010-1.42zM12 20a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-7.07-2.17a1 1 0 010-1.42l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.42 0z"/>
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
                  </svg>
                )}
              </motion.span>
            </motion.button>

            {/* Logged IN — Logout Button */}
            {isLoggedIn ? (
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2
                           bg-red-500/20 hover:bg-red-500/30
                           border border-red-500/30
                           text-red-400 hover:text-red-300
                           px-4 py-2 rounded-xl
                           text-sm font-semibold
                           transition-all duration-300"
              >
                🚪 Logout
              </motion.button>
            ) : (
              /* Logged OUT — Register Button */
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden
                             px-5 py-2 rounded-xl
                             text-sm font-bold text-white
                             bg-gradient-to-r from-purple-600 to-pink-500
                             shadow-lg shadow-purple-500/30"
                >
                  {/* Shine Effect */}
                  <motion.div
                    animate={{ x: ['-100%', '250%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1 }}
                    className="absolute inset-0
                               bg-gradient-to-r
                               from-transparent via-white/30 to-transparent
                               skew-x-12"
                  />
                  <span className="relative z-10">✦ Register</span>
                </motion.div>
              </Link>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white rounded-full block"
            />
          </motion.button>

        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden
                         bg-[#0d0d1a]/98 backdrop-blur-2xl
                         border-t border-white/10"
            >
              <div className="px-6 py-5 flex flex-col gap-2">

                {/* Home */}
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold
                                ${pathname === '/'
                                  ? 'bg-purple-600/30 text-white border border-purple-500/30'
                                  : 'text-gray-400 bg-white/5'
                                }`}
                  >
                    🏠 Home
                  </motion.div>
                </Link>

                {/* Dashboard — Login hone par */}
                {isLoggedIn && (
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold
                                  ${pathname === '/dashboard'
                                    ? 'bg-purple-600/30 text-white border border-purple-500/30'
                                    : 'text-gray-400 bg-white/5'
                                  }`}
                    >
                      ✨ Dashboard
                    </motion.div>
                  </Link>
                )}

                {/* Login — Logged out par */}
                {!isLoggedIn && (
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold
                                  ${pathname === '/login'
                                    ? 'bg-purple-600/30 text-white border border-purple-500/30'
                                    : 'text-gray-400 bg-white/5'
                                  }`}
                    >
                      🔐 Login
                    </motion.div>
                  </Link>
                )}

                {/* Theme Toggle */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={toggleTheme}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl
                             bg-white/5 border border-white/10
                             text-gray-400 text-sm font-semibold text-left"
                >
                  {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </motion.button>

                {/* Register — Logged out par */}
                {!isLoggedIn && (
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="px-4 py-3 rounded-xl text-center
                                 bg-gradient-to-r from-purple-600 to-pink-500
                                 text-white text-sm font-bold"
                    >
                      ✦ Register
                    </motion.div>
                  </Link>
                )}

                {/* Logout — Logged in par */}
                {isLoggedIn && (
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-xl text-left
                               bg-red-500/20 border border-red-500/30
                               text-red-400 text-sm font-semibold"
                  >
                    🚪 Logout
                  </motion.button>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  )
}