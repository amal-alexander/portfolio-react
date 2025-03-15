require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');

const blogContent = `# How to Create a Website Using React (Vite) in 2025

A step-by-step guide to building modern websites with React and Vite.`;

async function createBlogPost() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb');

        const newPost = new BlogPost({
            title: 'How to Create a Website Using React (Vite) in 2025',
            content: blogContent,
            author: 'Amal Alexander',
            tags: ['React', 'Vite', 'Tutorial'],
            readTime: '5 min read'
        });

        await newPost.save();
        console.log('Blog post created successfully!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

createBlogPost();