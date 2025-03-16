// src/components/Blog/BlogPost.jsx
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import blogPosts from '../data/blogPosts.jsx';

// Styled Components
const PostContainer = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.card};
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text_primary};
`;

const AuthorDate = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 20px;
`;

const Content = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.6;
`;

// BlogPost Component
const BlogPost = () => {
    const { slug } = useParams(); // Get the slug from URL parameters
    const post = blogPosts.find((p) => p.slug === slug); // Find the post by slug

    if (!post) return <div>Post not found</div>; // Handle post not found

    return (
        <PostContainer>
            <Title>{post.title}</Title>
            <AuthorDate>
                {post.author} - {new Date(post.date).toLocaleDateString()}
            </AuthorDate>
            <Content>{post.content}</Content>
        </PostContainer>
    );
};

export default blogPosts;