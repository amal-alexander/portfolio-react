// src/components/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { getPostByTitle } from '../../api/index';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;
    
    @media (max-width: 768px) {
        padding: 15px;
    }
    
    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.card || '#fff'};
    padding: 30px;
    border-radius: 12px;
    max-width: 800px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
        padding: 20px;
        width: 95%;
    }
    
    @media (max-width: 480px) {
        padding: 15px;
        width: 100%;
        border-radius: 8px;
    }
`;

const BlogTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.text_primary || '#333'};
    
    @media (max-width: 768px) {
        font-size: 24px;
    }
    
    @media (max-width: 480px) {
        font-size: 20px;
        margin-bottom: 10px;
    }
`;

const BlogContent = styled.p`
    font-size: 16px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary || '#666'};
    
    @media (max-width: 480px) {
        font-size: 14px;
        line-height: 1.5;
    }
`;

const LoadingText = styled.p`
    text-align: center;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary || '#333'};
    
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

const ErrorText = styled.p`
    text-align: center;
    color: red;
    font-size: 16px;
`;

const BlogDetails = ({ openModal, setOpenModal }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!openModal?.blog) return;
            try {
                setLoading(true);
                setError(null);
                // Use the blog data directly from openModal since it contains all necessary information
                setPost(openModal.blog);
            } catch (err) {
                setError('Failed to load blog post. Please try again later.');
                console.error('Error loading post:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [openModal?.blog]);

    if (!openModal?.state) return null;

    return (
        <ModalOverlay onClick={() => setOpenModal({ state: false, blog: null })}>
            <ModalContent onClick={e => e.stopPropagation()}>
                {loading ? (
                    <LoadingText>Loading...</LoadingText>
                ) : error ? (
                    <ErrorText>{error}</ErrorText>
                ) : post ? (
                    <>
                        <BlogTitle>{post.title}</BlogTitle>
                        <BlogContent>{post.content}</BlogContent>
                        <div style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
                            <span>Posted on {new Date(post.date).toLocaleDateString()}</span>
                            <span style={{ marginLeft: '10px' }}>Category: {post.category}</span>
                        </div>
                    </>
                ) : (
                    <ErrorText>Blog post not found</ErrorText>
                )}
            </ModalContent>
        </ModalOverlay>
    );
};

export default BlogDetails;