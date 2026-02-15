const postModel = require('../models/post.model');
const uploadImage = require('../services/storage.service')

async function createPost(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await uploadImage(req.file.buffer);

    const post = await postModel.create({
      image: result, 
      caption: req.body.caption,
      author: req.user.userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
}


async function getPosts(req,res) {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Posts fetched successfully", posts });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
}

async function deletePost(req,res) {
    try {
        const postId = req.params.id;
        const deletedPost = await postModel.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (deletedPost.author.toString() !== req.user.userId) {
  return res.status(403).json({ message: "Forbidden" });
}
        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
}

async function updatePost(req,res) {
    try {
        const postId = req.params.id;
        const updatedData = req.body;
        const updatedPost = await postModel.findByIdAndUpdate(postId, updatedData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (updatedPost.author.toString() !== req.user.userId) {
  return res.status(403).json({ message: "Forbidden" });
}
        res.status(200).json({ message: "Post updated successfully", updatedPost });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating post", error });
    }
}

module.exports = {
    createPost,
    getPosts,
    deletePost,
    updatePost
}