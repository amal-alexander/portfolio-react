// routes/posts.js

const express = require('express');
const router = express.Router();

// Example dummy data for testing
let posts = [
    { id: 1, title: "First Post", content: "This is the first post content." },
    { id: 2, title: "Second Post", content: "This is the second post content." },
];

// GET request to retrieve posts
router.get('/', (req, res) => {
    res.json(posts);
});

// GET request to retrieve a single post by ID
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found.');
    res.json(post);
});

// POST request to create a new post
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT request to update a post
router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found.');

    post.title = req.body.title;
    post.content = req.body.content;

    res.json(post);
});

// DELETE request to remove a post
router.delete('/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found.');

    const deletedPost = posts.splice(postIndex, 1);
    res.json(deletedPost);
});

module.exports = router;