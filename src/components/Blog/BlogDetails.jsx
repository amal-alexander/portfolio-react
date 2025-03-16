// src/components/Blog/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../api"; // Adjust the path based on your structure

const BlogDetail = () => {
    const { title } = useParams(); // Assuming title is being used from the route
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getPosts();
                const foundPost = posts.find((p) => p.title === title); // Match based on title
                setPost(foundPost);
            } catch (error) {
                setError('Error fetching post');
            }
        };
        fetchPosts();
    }, [title]);

    if (error) return <div>{error}</div>;
    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><strong>Author: {post.author}</strong></p>
        </div>
    );
};

export default BlogDetail;