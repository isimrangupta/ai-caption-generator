"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import API from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);

  // STATES
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchPosts = async () => {
    try{
      const response = await API.get("/api/posts")
      setPosts(response.data.posts)
    } catch(error){
      console.log(error)
    }
  };

  // FIX HYDRATION
  useEffect(() => {
    setMounted(true);

    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
    fetchPosts();
  }, []);

  // FILE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    setCaption(null);
    setError(null);
    setCopied(false);
  };

  // REMOVE IMAGE
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);

    setCaption(null);
    setError(null);
    setCopied(false);
  };

  // GENERATE CAPTION
  const handleGenerateCaption = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("image", selectedFile);

      const response = await API.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCaption(response.data.post.caption);
      fetchPosts();
    } catch (err) {
      setError("😔 Oops! Caption generation failed. Please try again.!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // COPY
  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // IMPORTANT
  if (!mounted) return null;

  return (
    <>
  
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden
                 min-h-screen
                 bg-[#f0f0f8] dark:bg-gray-900
                 transition-colors duration-300
                 flex flex-col items-center
                 py-16 px-4"
    >
  
      {/* BG GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />

      {/* HEADING */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl
                   font-extrabold
                   bg-gradient-to-r
                   from-purple-500 via-pink-500 to-purple-500
                   bg-clip-text text-transparent
                   text-center mb-4 z-10"
      >
        Generate AI Captions
      </motion.h1>

      {/* SUB HEADING */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 dark:text-gray-400
                   text-center mb-10
                   max-w-xl z-10"
      >
        Upload any image and get smart, creative and viral captions instantly
        using AI.
      </motion.p>

      {/* MAIN CARD */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/70 dark:bg-gray-800/70
                   backdrop-blur-2xl
                   rounded-3xl
                   shadow-2xl
                   border border-white/20 dark:border-gray-700
                   w-full max-w-2xl
                   p-10 z-10"
      >
        <AnimatePresence mode="wait">
          {!caption ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* UPLOAD AREA */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="border-2 border-dashed
                           border-gray-300 dark:border-gray-600
                           rounded-3xl
                           flex flex-col items-center justify-center
                           py-14 mb-6
                           bg-gray-50/70 dark:bg-gray-700/50"
              >
                {previewUrl ? (
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={previewUrl}
                    alt="Selected"
                    className="w-52 h-52 object-cover
                               rounded-3xl mb-4 shadow-2xl"
                  />
                ) : (
                  <>
                    <div className="bg-purple-100 dark:bg-purple-900 p-5 rounded-full mb-5">
                      📸
                    </div>

                    <p className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                      Choose an Image
                    </p>

                    <p className="text-gray-400 text-sm mt-1 mb-5">
                      Upload your image to generate caption
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />

                <label
                  htmlFor="fileInput"
                  className="bg-purple-600 hover:bg-purple-700
                             text-white px-7 py-3 rounded-2xl
                             cursor-pointer transition-all duration-300
                             hover:scale-105"
                >
                  Choose File
                </label>
              </motion.div>

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-center text-sm mb-4">{error}</p>
              )}

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerateCaption}
                disabled={!isLoggedIn || !selectedFile || loading}
                className={`w-full py-4 rounded-2xl font-semibold
                  transition-all duration-300

                  ${
                    isLoggedIn && selectedFile && !loading
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <div
                    className="relative flex items-center
               justify-center gap-3
               overflow-hidden"
                  >
                    {/* SHIMMER EFFECT */}
                    <motion.div
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "linear",
                      }}
                      className="absolute inset-0
                 bg-gradient-to-r
                 from-transparent
                 via-white/20
                 to-transparent"
                    />

                    {/* AI CORE */}
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        rotate: {
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                        },

                        scale: {
                          repeat: Infinity,
                          duration: 1.2,
                        },
                      }}
                      className="relative w-6 h-6"
                    >
                      {/* OUTER RING */}
                      <div
                        className="absolute inset-0
                   rounded-full
                   border-2 border-white/20"
                      />

                      {/* SPINNING GRADIENT */}
                      <div
                        className="absolute inset-0
                   rounded-full
                   border-2 border-transparent
                   border-t-white
                   border-r-pink-300"
                      />

                      {/* CENTER DOT */}
                      <div
                        className="absolute top-1/2 left-1/2
                   w-2 h-2 rounded-full
                   bg-white
                   -translate-x-1/2
                   -translate-y-1/2"
                      />
                    </motion.div>

                    {/* TEXT */}
                    <motion.span
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                      }}
                      className="font-medium tracking-wide"
                    >
                      AI crafting magic...
                    </motion.span>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span>✨</span>

                    <span>Generate Caption</span>
                  </motion.div>
                )}
              </motion.button>

              {/* LOGIN WARNING */}
              {!isLoggedIn && (
                <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-4">
                  🔒 Please register/login to generate caption
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-6"
            >
              {/* IMAGE */}
              <img
                src={previewUrl}
                alt="Uploaded"
                className="w-full h-72 object-cover rounded-3xl"
              />

              {/* CAPTION BOX */}
              <div
                className="bg-gray-100 dark:bg-gray-700
               rounded-2xl p-5"
              >
                {/* TOP */}
                <div className="flex items-center justify-between mb-3">
                  <h2
                    className="text-lg font-bold
                   text-gray-700 dark:text-white"
                  >
                    Generated Caption
                  </h2>

                  {/* COPY ICON */}
                  <button
                    onClick={handleCopyCaption}
                    className={`p-2 rounded-xl transition-all duration-300

          ${
            copied
              ? "bg-green-500 text-white"
              : "bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900"
          }`}
                  >
                    {copied ? (
                      <span className="text-sm">✅</span>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-700 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2
                 M10 8h8a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-8
                 a2 2 0 012-2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* CAPTION */}
                <p
                  className="text-gray-700 dark:text-gray-300
                 leading-relaxed break-words"
                >
                  {caption}
                </p>

                {/* COPY SUCCESS */}
                {copied && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-500 text-sm mt-3"
                  >
                    ✅ Caption copied successfully!
                  </motion.p>
                )}
              </div>

              {/* BUTTONS */}
              <div
                className="flex flex-col md:flex-row
               gap-4 w-full"
              >
                {/* CREATE ANOTHER IMAGE */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRemoveImage}
                  className="flex-1
                 bg-purple-600 hover:bg-purple-700
                 text-white py-3 rounded-2xl
                 transition-all duration-300"
                >
                  ✨ Create Another Image
                </motion.button>

                {/* REMOVE IMAGE */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRemoveImage}
                  className="flex-1
                 bg-red-500 hover:bg-red-600
                 text-white py-3 rounded-2xl
                 transition-all duration-300"
                >
                  🗑 Remove Image
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>

    {/* HISTORY SECTION */}

<div className="w-full max-w-7xl mt-16 z-10">

  {/* HEADING */}
  <div className="flex items-center justify-between mb-8">

    <div>
      <h2
        className="text-3xl md:text-4xl
                   font-extrabold
                   bg-gradient-to-r
                   from-purple-500 via-pink-500 to-purple-500
                   bg-clip-text text-transparent"
      >
        History
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Your previously generated AI captions
      </p>
    </div>

    <div
      className="hidden md:flex
                 items-center gap-2
                 bg-white/60 dark:bg-gray-800/60
                 backdrop-blur-xl
                 px-4 py-2 rounded-2xl
                 border border-white/20 dark:border-gray-700"
    >
      <span>✨</span>

      <span className="text-sm text-gray-700 dark:text-gray-300">
        {posts.length} Captions
      </span>
    </div>

  </div>

  {/* EMPTY STATE */}

  {posts.length === 0 ? (

    <div
      className="bg-white/60 dark:bg-gray-800/60
                 backdrop-blur-2xl
                 border border-white/20 dark:border-gray-700
                 rounded-3xl
                 p-12
                 flex flex-col items-center
                 justify-center
                 text-center"
    >
      <div className="text-6xl mb-4">
        📂
      </div>

      <h3
        className="text-2xl font-bold
                   text-gray-700 dark:text-white mb-2"
      >
        No History Yet
      </h3>

      <p className="text-gray-500 dark:text-gray-400">
        Generate your first AI caption and it will appear here.
      </p>
    </div>

  ) : (

    <div
      className="grid
                 grid-cols-1
                 sm:grid-cols-2
                 xl:grid-cols-3
                 gap-7"
    >

      {posts.map((post, index) => (

        <motion.div
          key={post._id}

          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}

          transition={{
            delay: index * 0.05
          }}

          whileHover={{
            y: -6
          }}

          className="group
                     bg-white/70 dark:bg-gray-800/70
                     backdrop-blur-2xl
                     border border-white/20 dark:border-gray-700
                     rounded-[28px]
                     overflow-hidden
                     shadow-xl
                     hover:shadow-2xl
                     transition-all duration-500"
        >

          {/* IMAGE */}

          <div className="relative overflow-hidden">

            <img
              src={post.image}
              alt="Post"

              className="w-full
                         h-64
                         object-cover
                         group-hover:scale-105
                         transition-transform duration-700"
            />

            {/* OVERLAY */}

            <div
              className="absolute inset-0
                         bg-gradient-to-t
                         from-black/50
                         via-black/10
                         to-transparent"
            />

            {/* BADGE */}

            <div
              className="absolute top-4 left-4
                         bg-white/20
                         backdrop-blur-xl
                         px-3 py-1
                         rounded-full
                         text-white text-sm"
            >
              ✨ AI Caption
            </div>

          </div>

          {/* CONTENT */}

          <div className="p-5">

            {/* CAPTION */}

            <div
              className="bg-gray-100/80 dark:bg-gray-700/60
                         rounded-2xl
                         p-4
                         min-h-[120px]
                         mb-5"
            >
              <p
                className="text-gray-700 dark:text-gray-300
                           leading-relaxed
                           text-sm md:text-base"
              >
                {post.caption}
              </p>
            </div>

            {/* BUTTONS */}

            <div className="flex gap-3">

              {/* COPY BUTTON */}

              <button
                onClick={() => navigator.clipboard.writeText(post.caption)}

                className="flex-1
                           bg-purple-600 hover:bg-purple-700
                           text-white
                           py-3
                           rounded-2xl
                           transition-all duration-300
                           hover:scale-[1.02]"
              >
                📋 Copy
              </button>

              {/* DELETE BUTTON */}

              <button
                className="flex-1
                           bg-red-500 hover:bg-red-600
                           text-white
                           py-3
                           rounded-2xl
                           transition-all duration-300
                           hover:scale-[1.02]"
              >
                🗑 Delete
              </button>

            </div>

          </div>

        </motion.div>
      ))}
    </div>
  )}
</div>
    </>
  );
}
