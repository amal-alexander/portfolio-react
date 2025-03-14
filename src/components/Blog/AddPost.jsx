import React, { useState } from 'react';
import { createPost } from '../../api'; // Adjust the import according to your api.js location

const AddPost = ({ onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, content, author };

        try {
            const addedPost = await createPost(newPost);
            onPostAdded(addedPost);
            setTitle('');
            setContent('');
            setAuthor('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Author" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                required 
            />
            <button type="submit">Add Post</button>
        </form>
    );
};

export default AddPost;