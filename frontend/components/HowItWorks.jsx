'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    icon: '📸',
    title: 'Upload Image',
    description:
      'Choose any image from your device. JPG, PNG, and WEBP — all formats are supported.!',
    color: 'from-purple-500 to-purple-700',
    shadow: 'shadow-purple-500/30',
    border: 'border-purple-200 dark:border-purple-800',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    number: '02',
    icon: '🤖',
    title: 'AI Processes',
    description:
      'Google Gemini analyzes your image and works like magic.!',
    color: 'from-pink-500 to-pink-700',
    shadow: 'shadow-pink-500/30',
    border: 'border-pink-200 dark:border-pink-800',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    number: '03',
    icon: '✨',
    title: 'Caption Ready!',
    description:
      'Creative caption with hashtags and emojis — just copy and post!',
    color: 'from-indigo-500 to-indigo-700',
    shadow: 'shadow-indigo-500/30',
    border: 'border-indigo-200 dark:border-indigo-800',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
]

export default function HowItWorks() {
  return (
    <section
      className="relative w-full overflow-hidden
                 bg-white dark:bg-gray-900
                 py-24 px-4
                 transition-colors duration-300"
    >

      {/* ── Background Glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2
                      w-[600px] h-[300px]
                      bg-purple-400/10 dark:bg-purple-600/10
                      rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2
                       bg-purple-100 dark:bg-purple-900/40
                       text-purple-600 dark:text-purple-300
                       text-sm font-semibold
                       px-4 py-2 rounded-full
                       border border-purple-200 dark:border-purple-700
                       mb-5"
          >
            🪄 Simple Process
          </motion.span>

          <h2
            className="text-4xl md:text-6xl font-extrabold
                       text-gray-800 dark:text-white mb-4"
          >
            How It{' '}
            <span
              className="bg-gradient-to-r from-purple-600 to-pink-500
                         bg-clip-text text-transparent"
            >
              Works
            </span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400
                        text-lg max-w-xl mx-auto">
            3 simple steps to get your perfect AI caption instantly
          </p>
        </motion.div>

        {/* ── Steps ── */}
        <div className="relative flex flex-col md:flex-row
                        items-center justify-center
                        gap-6 md:gap-0">

          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row
                         items-center w-full md:w-auto"
            >

              {/* ── Card ── */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className={`relative
                            w-full md:w-72
                            ${step.bg}
                            border ${step.border}
                            rounded-3xl p-8
                            shadow-2xl ${step.shadow}
                            cursor-default
                            transition-all duration-300
                            group`}
              >

                {/* Animated Number — Background */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
                  className="absolute top-4 right-5
                             text-7xl font-extrabold
                             text-gray-100 dark:text-gray-800
                             select-none pointer-events-none
                             group-hover:text-gray-200
                             dark:group-hover:text-gray-700
                             transition-colors duration-300"
                >
                  {step.number}
                </motion.span>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                  className={`w-16 h-16 rounded-2xl
                              bg-gradient-to-br ${step.color}
                              flex items-center justify-center
                              text-3xl mb-6
                              shadow-lg ${step.shadow}`}
                >
                  {step.icon}
                </motion.div>

                {/* Step Number Badge */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className={`inline-flex items-center gap-1
                              bg-gradient-to-r ${step.color}
                              text-white text-xs font-bold
                              px-3 py-1 rounded-full mb-3`}
                >
                  Step {i + 1}
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl font-extrabold
                             text-gray-800 dark:text-white mb-2"
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400
                              text-sm leading-relaxed">
                  {step.description}
                </p>

              </motion.div>

              {/* ── Arrow Between Cards ── */}
              {i < STEPS.length - 1 && (

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.4 }}
                  className="flex items-center justify-center
                             mx-4 my-4 md:my-0"
                >

                  {/* Desktop Arrow */}
                  <div className="hidden md:flex flex-col items-center gap-1">
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg
                        className="w-10 h-10 text-purple-400 dark:text-purple-600"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-purple-400 font-medium"
                    >
                      then
                    </motion.div>
                  </div>

                  {/* Mobile Arrow — Down */}
                  <div className="flex md:hidden flex-col items-center">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg
                        className="w-8 h-8 text-purple-400"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>

                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Ready to try it? 🚀
          </p>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2
                       bg-gradient-to-r from-purple-600 to-pink-500
                       text-white font-bold
                       px-8 py-4 rounded-2xl
                       shadow-xl shadow-purple-500/30
                       hover:opacity-90
                       transition-all duration-300"
          >
            ✦ Try It Now — It's Free
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}