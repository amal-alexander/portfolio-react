// src/components/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { getPostByTitle } from '../../api/index';

const BlogDetails = ({ openModal, setOpenModal }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!openModal.blog) return;
            try {
                const data = await getPostByTitle(openModal.blog.title);
                setPost(data);
            } catch (err) {
                setError('Failed to fetch post. Please try again later.');
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [openModal.blog]);

    if (!openModal.state) return null;

    return (
        <div className="modal-overlay" onClick={() => setOpenModal({ state: false, blog: null })}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <>
                        <h2>{openModal.blog.title}</h2>
                        <p>{openModal.blog.content}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogDetails;