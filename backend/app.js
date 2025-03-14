// app.js
const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors'); // Import cors
const BlogPost = require('./models/BlogPost'); // Import your BlogPost model

const app = express(); // Create an instance of express

// Use CORS middleware to allow HTTP requests from your React front end
app.use(cors({ 
    origin: "https://your-vercel-app-url.vercel.app" // Replace this with your actual Vercel app URL
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb', { // Use your MongoDB URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Create a new blog post
app.post('/posts', async (req, res) => {
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
app.get('/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a blog post by ID
app.put('/posts/:id', async (req, res) => {
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
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});