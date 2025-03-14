// routes/posts.js

const express = require('express');
const BlogPost = require('../models/BlogPost'); // Import your BlogPost model

const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;

    try {
        const newPost = new BlogPost({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(id, { title, content, author }, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await BlogPost.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // Export the router to be used in app.js