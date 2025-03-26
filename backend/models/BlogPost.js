const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    category: { type: String, required: true },
    coverImage: { type: String },
    codeBlocks: [{
        language: { type: String },
        code: { type: String },
        description: { type: String }
    }],
    images: [{
        url: { type: String, required: true },
        caption: { type: String },
        altText: { type: String }
    }]
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
