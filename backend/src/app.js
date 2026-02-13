const express = require('express');
const multer = require('multer');
const uploadImage = require('./services/storage.service')
const app = express();

app.use(express.json());

const upload = multer({storage: multer.memoryStorage()});

app.post('/create-post', upload.single('image'), async (req, res) => {
    console.log(req.body)
    const result = await uploadImage(req.file.buffer);
    console.log(result)
    res.status(201).json({ message: "Post created successfully", imageUrl: result });
})

module.exports = app;