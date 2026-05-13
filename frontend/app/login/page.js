"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {

  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // States
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Handle Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError(null);

    setLoading(true);

    try {

      const response = await API.post(
        "/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

     

      router.refresh()
      setTimeout(() => {
        router.push('/dashboard')
      },2200);

      // Success Popup
      setShowPopup(true);

    

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Something went wrong!"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div

      className="relative overflow-hidden
                 min-h-screen
                 bg-[#f5f3ff] dark:bg-gray-950
                 flex items-center justify-center
                 px-4 py-10
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

      {/* Success Popup */}
      <AnimatePresence>

        {showPopup && (

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.8,
              y: -40,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              scale: 0.8,
            }}

            className="fixed top-6 z-50
                       bg-white dark:bg-gray-900
                       border border-green-200 dark:border-green-700
                       shadow-2xl
                       px-6 py-4
                       rounded-2xl
                       flex items-center gap-3"
          >

            {/* Icon */}
            <div
              className="w-10 h-10
                         rounded-full
                         bg-green-100 dark:bg-green-900
                         flex items-center justify-center"
            >
              ✅
            </div>

            <div>

              <p
                className="font-bold
                           text-gray-800 dark:text-white"
              >
                Login Successful
              </p>

              <p
                className="text-sm
                           text-gray-500 dark:text-gray-400"
              >
                Redirecting to home page...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
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
                   p-8"
      >

        {/* Logo */}
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
            duration: 0.6,
          }}

          className="w-16 h-16
                     rounded-2xl
                     bg-gradient-to-r
                     from-purple-500 to-pink-500
                     flex items-center justify-center
                     text-2xl
                     text-white
                     mx-auto mb-5
                     shadow-xl"
        >
          ✦
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

          className="text-3xl
                     font-extrabold
                     text-center
                     bg-gradient-to-r
                     from-purple-500 via-pink-500 to-purple-500
                     bg-clip-text text-transparent
                     mb-2"
        >
          Welcome Back
        </motion.h2>

        {/* Sub Text */}
        <p
          className="text-center
                     text-gray-500 dark:text-gray-400
                     text-sm mb-8"
        >
          Login to continue your AI journey 🚀
        </p>

        {/* Error */}
        <AnimatePresence>

          {error && (

            <motion.div

              initial={{
                opacity: 0,
                y: -10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
              }}

              className="bg-red-50 dark:bg-red-900/20
                         border border-red-200 dark:border-red-700
                         text-red-500
                         text-sm
                         px-4 py-3
                         rounded-2xl
                         mb-5 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* Email */}
          <InputField
            icon="📧"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <InputField
            icon="🔒"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Login Button */}
          <motion.button

            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.96,
            }}

            disabled={loading}

            className={`relative overflow-hidden
                        w-full py-3.5
                        rounded-2xl
                        font-semibold
                        text-white
                        transition-all duration-300
                        shadow-xl

                        ${loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
              }`}
          >

            {/* Shine Effect */}
            {!loading && (

              <motion.div

                animate={{
                  x: ["-100%", "250%"],
                }}

                transition={{
                  duration: 2,
                  repeat: 2,
                  ease: "linear",
                }}

                className="absolute inset-0
                           bg-gradient-to-r
                           from-transparent
                           via-white/30
                           to-transparent
                           skew-x-12"
              />
            )}

            {loading ? (

              <div
                className="w-5 h-5
                           border-2 border-white
                           border-t-transparent
                           rounded-full animate-spin
                           mx-auto"
              />

            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/* Register Link */}
        <p
          className="text-center
                     text-sm
                     text-gray-500 dark:text-gray-400
                     mt-6"
        >
          Do not have an account?{" "}

          <Link
            href="/register"
            className="text-purple-600
                       hover:text-pink-500
                       font-semibold
                       transition-colors"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// Input Component
function InputField({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.01,
      }}

      className="flex items-center gap-3
                 border border-gray-200 dark:border-gray-700
                 bg-white/50 dark:bg-gray-800/50
                 backdrop-blur-md
                 rounded-2xl
                 px-4 py-3
                 focus-within:border-purple-500
                 transition-all duration-300"
    >

      <span className="text-lg">
        {icon}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}

        required

        className="w-full bg-transparent
                   outline-none
                   text-sm
                   text-gray-700 dark:text-white
                   placeholder-gray-400"
      />
    </motion.div>
  );
}