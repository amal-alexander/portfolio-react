const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);