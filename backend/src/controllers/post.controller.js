const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  const file = req.file;
  console.log("File received", file);

  const base64Image = Buffer.from(file.buffer).toString("base64"); // ✅ Fixed

  const caption = await generateCaption(base64Image);
  const result = await uploadFile(file.buffer, `${uuidv4()}`);

  const post = await postModel.create({
    caption: caption,
    image: result.url,
    user: req.user._id
  });

  res.status(201).json({
    message: "Post created successfully",
    post
  });
}

async function getPostsController(req, res) {

  try {

    const posts = await postModel.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      posts
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch posts"
    });
  }
}

async function deletePostController(req, res) {

  try {

    const post = await postModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete post"
    });
  }
}

module.exports = { 
  createPostController,
  getPostsController,
  deletePostController
};