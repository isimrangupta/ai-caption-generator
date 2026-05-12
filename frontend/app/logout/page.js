"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutPage() {
  const router = useRouter();
  Cookies.remove("token");
  const showContent = true;

  return (
    <div
      className="relative overflow-hidden
                 min-h-screen
                 bg-[#f5f3ff] dark:bg-gray-950
                 flex items-center justify-center
                 px-4
                 transition-colors duration-300"
    >
      {/* Background Glow */}
      <div
        className="absolute top-0 left-0
                   w-72 h-72
                   bg-purple-500/20
                   rounded-full blur-3xl"
      />

      <div
        className="absolute bottom-0 right-0
                   w-72 h-72
                   bg-pink-500/20
                   rounded-full blur-3xl"
      />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative z-10
                       w-full max-w-md
                       bg-white/70 dark:bg-gray-900/70
                       backdrop-blur-2xl
                       border border-white/20 dark:border-gray-700
                       rounded-3xl
                       shadow-2xl
                       p-10
                       flex flex-col items-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{
                scale: 0,
                rotate: -180,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.7,
                type: "spring",
              }}
              className="relative
                         w-24 h-24
                         rounded-full
                         bg-gradient-to-r
                         from-green-400 to-emerald-500
                         flex items-center justify-center
                         mb-6
                         shadow-2xl"
            >
              {/* Glow */}
              <div
                className="absolute inset-0
                           rounded-full
                           bg-green-400/40
                           blur-2xl"
              />

              {/* Check Icon */}
              <svg
                className="relative z-10
                           w-10 h-10
                           text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="text-3xl
                         font-extrabold
                         text-center
                         bg-gradient-to-r
                         from-purple-500 via-pink-500 to-purple-500
                         bg-clip-text text-transparent
                         mb-3"
            >
              Logged Out
            </motion.h2>

            {/* Text */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              className="text-gray-500 dark:text-gray-400
                         text-center
                         text-sm
                         leading-relaxed
                         mb-8"
            >
              Your session has been ended successfully.
              <br />
              See you again soon 👋
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="w-full flex flex-col sm:flex-row gap-4"
            >
              {/* Login Button */}
              <Link href="/login" className="flex-1">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="w-full
                             bg-gradient-to-r
                             from-purple-600 to-pink-500
                             hover:opacity-90
                             text-white
                             py-3
                             rounded-2xl
                             font-semibold
                             shadow-xl
                             transition-all duration-300"
                >
                  Login Again
                </motion.button>
              </Link>

              {/* Home Button */}
              <Link href="/" className="flex-1">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="w-full
                             bg-white/80 dark:bg-gray-800
                             border border-gray-200 dark:border-gray-700
                             text-gray-700 dark:text-white
                             py-3
                             rounded-2xl
                             font-semibold
                             shadow-lg
                             transition-all duration-300"
                >
                  Go Home
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
