import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
    position: relative;
    z-index: 1;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap; /* Allow wrapping for responsiveness */
    justify-content: center;
    gap: 20px; /* Space between blog posts */
    max-width: 1200px;
    padding: 0 20px;
`;

const Title = styled(motion.h1)`
    font-size: 42px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    text-align: center;
    margin: 20px 0;

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

const BlogPost = styled(motion.div)`
    background-color: ${({ theme }) => theme.card};
    width: 300px; /* Fixed width for square shaping */
    height: 300px; /* Fixed height for square shaping */
    border-radius: 12px;
    padding: 20px;
    color: ${({ theme }) => theme.text_primary};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start; /* Align text to top */
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    overflow: hidden;

    &:hover {
        transform: translateY(-5px);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 16px;
    }

    @media (max-width: 768px) {
        width: 90%; /* Full width on mobile */
        height: auto; /* Allow auto height on mobile for flexibility */
    }
`;

const PostTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
`;

const PostContent = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.text_secondary};
`;

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Simulating fetch of blog posts
        const fetchPosts = () => {
            setPosts([
                { title: 'Blog Post 1', content: 'This is the content of the first post' },
                { title: 'Blog Post 2', content: 'This is the content of the second post' },
                { title: 'Blog Post 3', content: 'This is the content of the third post' },
            ]);
        };

        fetchPosts();
    }, []);

    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <Title
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                My Blog
            </Title>
            <Wrapper>
                {posts.map((post, index) => (
                    <BlogPost
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <PostTitle>{post.title}</PostTitle>
                        <PostContent>{post.content}</PostContent>
                    </BlogPost>
                ))}
            </Wrapper>
        </Container>
    );
};

export default Blog;