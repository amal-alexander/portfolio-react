// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../api';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };

        getPosts();
    }, []);

    const handleDelete = async (id) => {
        await deletePost(id);
        setPosts(posts.filter(post => post._id !== id)); // Optimistic update
    };

    return (
        <div>
            <h2>Blog Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;