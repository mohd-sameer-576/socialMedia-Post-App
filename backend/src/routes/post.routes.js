const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authmiddleware');
const postController = require('../controllers/post.controller')

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()});
router.post('/create-post', authMiddleware, upload.single('image'), postController.createPost)
router.get('/get-posts', postController.getPosts)
router.get("/my-posts", authMiddleware, postController.getMyPosts);
router.delete('/delete-post/:id', authMiddleware, postController.deletePost)
router.put('/update-post/:id', authMiddleware, postController.updatePost)

module.exports = router;