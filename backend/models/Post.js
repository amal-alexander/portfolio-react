// routes/posts.js

const express = require('express');
const router = express.Router();

// Example dummy data for testing
const posts = [
    { id: 1, title: "First Post", content: "This is the first post content." },
    { id: 2, title: "Second Post", content: "This is the second post content." },
];

// GET request to retrieve posts
router.get('/', (req, res) => {
    res.json(posts);
});

module.exports = router;