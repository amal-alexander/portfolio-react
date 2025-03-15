require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');

async function viewBlogPosts() {
    try {
        // Updated connection options with retry logic
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            retryWrites: true,
            w: 'majority',
            connectTimeoutMS: 10000
        });
        
        console.log('Connected to MongoDB successfully!');
        
        const posts = await BlogPost.find({}).sort({ createdAt: -1 });
        
        if (posts.length === 0) {
            console.log('No blog posts found.');
            return;
        }

        console.log('\nYour Blog Posts:\n');
        posts.forEach(post => {
            console.log(`Title: ${post.title}`);
            console.log(`Author: ${post.author}`);
            console.log(`Created: ${post.createdAt}`);
            console.log(`Tags: ${post.tags.join(', ')}`);
            console.log(`Read Time: ${post.readTime}`);
            console.log('\nContent Preview:');
            console.log(post.content.substring(0, 200) + '...\n');
            console.log('-'.repeat(80) + '\n');
        });
    } catch (error) {
        console.error('Connection error:', error.message);
        if (error.name === 'MongoServerSelectionError') {
            console.log('\nTroubleshooting tips:');
            console.log('1. Make sure MongoDB is running');
            console.log('2. Check if MongoDB is installed correctly');
            console.log('3. Verify the connection string in .env file');
        }
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('Database connection closed.');
        }
    }
}

viewBlogPosts();