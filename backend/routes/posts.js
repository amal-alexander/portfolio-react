const express = require('express');
const BlogPost = require('../models/BlogPost'); // Import the BlogPost model

const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, slug, content, category, author, coverImage, codeBlocks, images } = req.body;

    // Log the request body for debugging
    console.log('Request Body:', req.body);

    // Check for missing required fields
    if (!title || !content || !category || !author) {
        return res.status(400).json({ error: 'Missing required fields: title, content, category, or author.' });
    }

    try {
        // Check if a post with the same slug already exists
        const existingPost = await BlogPost.findOne({ slug });
        if (existingPost) {
            return res.status(400).json({ error: 'A post with this slug already exists.' });
        }

        const newPost = new BlogPost({ 
            title, 
            slug, 
            content, 
            category, 
            author,
            coverImage,
            codeBlocks,
            images
        });
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

// Get a single blog post by slug
router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
    const { title, slug, content, category, author, coverImage, codeBlocks, images } = req.body;

    try {
        // Check if the post exists
        const existingPost = await BlogPost.findById(req.params.id);
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the new slug conflicts with another post
        if (slug && slug !== existingPost.slug) {
            const slugConflict = await BlogPost.findOne({ slug });
            if (slugConflict) {
                return res.status(400).json({ error: 'A post with this slug already exists.' });
            }
        }

        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            { 
                title, 
                slug, 
                content, 
                category, 
                author,
                coverImage,
                codeBlocks,
                images
            },
            { new: true, runValidators: true } // Ensure validators are run
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;