"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import API from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {

  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // POSTS
  const [posts, setPosts] = useState([]);

  // STATES
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [copied, setCopied] = useState(null);

  // FETCH POSTS
  const fetchPosts = async () => {
    try {

      const response = await API.get("/api/posts");

      setPosts(response.data.posts);

    } catch (error) {

      console.log(error);
    }
  };

  // HYDRATION FIX
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
  };

  // REMOVE
  const handleRemoveImage = () => {

    setSelectedFile(null);

    setPreviewUrl(null);

    setCaption(null);

    setError(null);
  };

  // GENERATE
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

      setError("😔 Oops! Caption generation failed. Please try again.");

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // DELETE
  const handleDeletePost = async (id) => {

    try {

      await API.delete(`/api/posts/${id}`);

      setPosts(posts.filter((post) => post._id !== id));

    } catch (error) {

      console.log(error);
    }
  };

  // HYDRATION
  if (!mounted) return null;

  return (

    <div
      className="relative overflow-hidden
                 min-h-screen
                 bg-gradient-to-br
                 from-[#0f0f1a]
                 via-[#14142b]
                 to-[#09090f]
                 text-white
                 py-16 px-4"
    >

      {/* BG GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14 relative z-10"
      >

        <h1
          className="text-4xl md:text-6xl
                     font-extrabold
                     bg-gradient-to-r
                     from-pink-400 via-purple-400 to-indigo-400
                     bg-clip-text text-transparent"
        >
          Generate AI Captions
        </h1>

        <p
          className="text-gray-400
                     mt-4 max-w-2xl mx-auto"
        >
          Upload your image and generate viral AI captions instantly ✨
        </p>
      </motion.div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10
                   max-w-2xl mx-auto
                   bg-white/5
                   border border-white/10
                   backdrop-blur-2xl
                   rounded-[32px]
                   p-8 shadow-2xl"
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
              <div
                className="border-2 border-dashed
                           border-purple-500/30
                           rounded-[28px]
                           p-10
                           flex flex-col
                           items-center justify-center
                           bg-white/5"
              >

                {previewUrl ? (

                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-52 h-52
                               object-cover
                               rounded-3xl
                               mb-6"
                  />

                ) : (

                  <>
                    <div className="text-6xl mb-4">
                      📸
                    </div>

                    <h2 className="text-2xl font-bold">
                      Upload Image
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Select an image to generate captions
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <label
                  htmlFor="fileInput"
                  className="mt-6
                             bg-gradient-to-r
                             from-purple-500 to-pink-500
                             px-8 py-3
                             rounded-2xl
                             cursor-pointer
                             hover:scale-105
                             transition-all duration-300"
                >
                  Choose File
                </label>
              </div>

              {/* ERROR */}
              {error && (

                <p className="text-red-400 text-center mt-5">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                onClick={handleGenerateCaption}
                disabled={!selectedFile || loading || !isLoggedIn}
                className={`w-full mt-6 py-4 rounded-2xl
                            font-semibold transition-all duration-300

                ${
                  selectedFile && !loading && isLoggedIn
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02]"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
              >

                {loading ? (

                  <div className="flex items-center justify-center gap-3">

                    <div
                      className="w-5 h-5 rounded-full
                                 border-2 border-white/20
                                 border-t-white animate-spin"
                    />

                    <span>
                      AI crafting magic...
                    </span>
                  </div>

                ) : (

                  "✨ Generate Caption"
                )}
              </button>

              {!isLoggedIn && (

                <p className="text-center text-gray-400 mt-4">
                  🔒 Please login first
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

              <img
                src={previewUrl}
                alt="Uploaded"
                className="w-full h-72 object-cover rounded-3xl"
              />

              {/* CAPTION */}
              <div
                className="bg-white/5
                           border border-white/10
                           rounded-3xl p-6"
              >

                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-xl font-bold">
                    Generated Caption
                  </h2>

                  <button
                    onClick={async () => {

                      await navigator.clipboard.writeText(caption);

                      setCopied("main");

                      setTimeout(() => {
                        setCopied(null);
                      }, 2000);
                    }}

                    className={`p-2 rounded-xl transition-all

                    ${
                      copied === "main"
                        ? "bg-green-500"
                        : "bg-white/10"
                    }`}
                  >
                    {copied === "main" ? "✅" : "📋"}
                  </button>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {caption}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4">

                <button
                  onClick={handleRemoveImage}
                  className="flex-1
                             bg-purple-500
                             hover:bg-purple-600
                             py-3 rounded-2xl"
                >
                  ✨ Create Another
                </button>

                <button
                  onClick={handleRemoveImage}
                  className="flex-1
                             bg-red-500
                             hover:bg-red-600
                             py-3 rounded-2xl"
                >
                  🗑 Remove
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* HISTORY */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mt-24 relative z-10"
      >

        {/* HEADING */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h2
              className="text-4xl font-extrabold
                         bg-gradient-to-r
                         from-pink-400 to-purple-400
                         bg-clip-text text-transparent"
            >
              Your AI History ✨
            </h2>

            <p className="text-gray-400 mt-2">
              All your generated captions saved here
            </p>
          </div>

          <div
            className="hidden md:flex
                       items-center gap-2
                       bg-white/5
                       border border-white/10
                       px-4 py-2 rounded-2xl"
          >
            📸 {posts.length} Posts
          </div>
        </div>

        {/* EMPTY */}
        {posts.length === 0 ? (

          <div
            className="bg-white/5
                       border border-white/10
                       rounded-3xl
                       p-16 text-center"
          >

            <div className="text-6xl mb-5">
              🖼️
            </div>

            <h3 className="text-2xl font-bold mb-2">
              No Captions Yet
            </h3>

            <p className="text-gray-400">
              Generate captions and they will appear here.
            </p>
          </div>

        ) : (

          <div
            className="grid
                       grid-cols-1
                       sm:grid-cols-2
                       lg:grid-cols-3
                       xl:grid-cols-4
                       gap-6"
          >

            {posts.map((post, index) => (

              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}

                whileHover={{
                  y: -6,
                }}

                className="group
                           overflow-hidden
                           rounded-[28px]
                           bg-white/5
                           border border-white/10
                           backdrop-blur-xl"
              >

                {/* IMAGE */}
                <div className="relative">

                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-52 object-cover"
                  />

                  <div
                    className="absolute top-3 left-3
                               bg-black/40
                               backdrop-blur-md
                               px-3 py-1
                               rounded-full
                               text-xs"
                  >
                    ✨ AI Generated
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <div className="flex items-start justify-between mb-4">

                    <h3 className="font-bold text-lg">
                      Generated Caption
                    </h3>

                    <button
                      onClick={() => handleDeletePost(post._id)}

                      className="bg-red-500/10
                                 hover:bg-red-500
                                 text-red-400
                                 hover:text-white
                                 p-2 rounded-full
                                 transition-all duration-300"
                    >
                      🗑
                    </button>
                  </div>

                  {/* CAPTION */}
                  <p
                    className="text-gray-300
                               text-sm
                               leading-relaxed
                               line-clamp-3
                               mb-5"
                  >
                    {post.caption}
                  </p>

                  {/* FOOTER */}
                  <div
                    className="flex items-center justify-between
                               border-t border-white/10
                               pt-4"
                  >

                    <span className="text-xs text-gray-500">

                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "Recently Generated"}
                    </span>

                    {/* COPY */}
                    <button
                      onClick={async () => {

                        await navigator.clipboard.writeText(post.caption);

                        setCopied(post._id);

                        setTimeout(() => {
                          setCopied(null);
                        }, 2000);
                      }}

                      className={`p-2 rounded-xl transition-all duration-300

                      ${
                        copied === post._id
                          ? "bg-green-500 text-white"
                          : "bg-white/5 hover:bg-purple-500/20"
                      }`}
                    >

                      {copied === post._id ? "✅" : "📋"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}