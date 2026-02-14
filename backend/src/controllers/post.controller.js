const postModel = require('../models/post.model');
const uploadImage = require('../services/storage.service')

async function createPost(req,res) {
    try {
        const result = await uploadImage(req.file.buffer);
    const post = new postModel({
        image: result,
        caption: req.body.caption
    })
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating post", error });
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
module.exports = {
    createPost,
    getPosts
}