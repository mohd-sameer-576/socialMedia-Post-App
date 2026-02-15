const mongoose = require('mongoose');

const postScehma = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true })
const postModel = mongoose.model('post', postScehma)

module.exports = postModel;