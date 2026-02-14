const express = require('express');
const multer = require('multer');
const uploadImage = require('./services/storage.service')
const postModel = require('./models/post.model')
const authRoutes = require('./routes/auth.routes');
const cookies = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookies());
app.use('/api/auth', authRoutes);


const upload = multer({storage: multer.memoryStorage()});

app.post('/create-post', upload.single('image'), async (req, res) => {
    const result = await uploadImage(req.file.buffer);
    const post = new postModel({
        image: result,
        caption: req.body.caption
    })
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
})

app.get('/posts', async (req, res) => {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Posts fetched successfully", posts });
})
module.exports = app;