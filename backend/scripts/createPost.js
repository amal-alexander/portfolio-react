const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');

const blogContent = `
# How to Create a Website Using React (Vite) in 2025

## Introduction
Building a modern website with React and Vite has become even more streamlined in 2025. This guide will walk you through the process of creating a fast, efficient, and production-ready website.

## Prerequisites
- Node.js 20.x or later
- A code editor (VS Code recommended)
- Basic knowledge of JavaScript and React

## Step 1: Setting Up Your Development Environment
First, create a new Vite project with React:

\`\`\`bash
npm create vite@latest my-website -- --template react-ts
cd my-website
npm install
\`\`\`

## Step 2: Project Structure
Vite creates a minimal project structure:

\`\`\`
my-website/
├── public/
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
\`\`\`

## Step 3: Installing Essential Dependencies
Add necessary packages for a modern React website:

\`\`\`bash
npm install react-router-dom @tanstack/react-query styled-components framer-motion
\`\`\`

## Step 4: Development
Start the development server:

\`\`\`bash
npm run dev
\`\`\`

## Step 5: Building for Production
When ready to deploy:

\`\`\`bash
npm run build
\`\`\`

## Best Practices for 2025
1. Use React Server Components for better performance
2. Implement AI-powered features using OpenAI or similar APIs
3. Ensure accessibility compliance
4. Utilize CSS-in-JS for better maintainability
5. Implement progressive web app features

## Conclusion
Creating a React website with Vite in 2025 offers numerous advantages including faster build times, better developer experience, and optimal performance. Follow these steps and best practices to create a modern, efficient website.

## Additional Resources
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Modern React Best Practices](https://react.dev/learn/thinking-in-react)
`;

async function createBlogPost() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const newPost = new BlogPost({
            title: 'How to Create a Website Using React (Vite) in 2025',
            content: blogContent,
            author: 'Amal Alexander',
            tags: ['React', 'Vite', 'Web Development', 'Tutorial', '2025'],
            readTime: '8 min read'
        });

        await newPost.save();
        console.log('Blog post created successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating blog post:', error);
        mongoose.connection.close();
    }
}

createBlogPost();