import React from 'react';
import { useParams } from 'react-router-dom';
import blogPosts from '../../data/blogPosts';

const BlogDetail = () => {
    const { title } = useParams(); // Extracting the slug from the URL

    // If the post is not found, display a 'Not Found' message
    if (!post) {
        return <div>Post not found!</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1> {/* Displaying the post title */}
            <p>{post.content}</p> {/* Displaying the post content */}
        </div>
    );
};

export default BlogDetail;