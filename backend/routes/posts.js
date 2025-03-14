const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    const { title, slug, content } = req.body;
    const post = new Post({ title, slug, content });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other CRUD operations (update, delete) can be added here...

module.exports = router;