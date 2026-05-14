const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const {
  createPostController,
  getPostsController,
  deletePostController,
} = require("../controllers/post.controller");

const upload = multer({
  storage: multer.memoryStorage(),
});

/*  POST /api/posts  [protected] {imahe-file} */
router.post("/", authMiddleware, upload.single("image"), createPostController);

router.get("/", authMiddleware, getPostsController);

router.delete("/:id", authMiddleware, deletePostController);

module.exports = router;
