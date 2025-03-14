// app.js
const express = require('express');
const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a Blog Post schema
const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create a Blog Post model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Endpoint to create a new blog post
app.post('/posts', async (req, res) => {
    try {
        const newPost = new BlogPost(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint to get all blog posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});