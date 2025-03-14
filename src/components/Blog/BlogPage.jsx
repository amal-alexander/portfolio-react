import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts'; 
import './App.css';  // Ensure you have your CSS file imported

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState(''); 

    // Filter posts based on the search term
    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="blog-container">
            <h1 className="blog-title">My Blog</h1>
            <input 
                type="text" 
                placeholder="Search blog posts..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-post">
                            <h3>{post.title}</h3>
                        </Link>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default BlogPage;