import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import blogPosts from './blogPosts';
import BlogListMeta from './BlogListMeta'; // Import the blogPosts data

const SectionContainer = styled.section`
    padding: 80px 0;
    background-color: ${({ theme }) => theme.background};
    
    @media (max-width: 768px) {
        padding: 60px 0;
    }
    
    @media (max-width: 480px) {
        padding: 40px 0;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
    
    @media (max-width: 768px) {
        padding: 0 16px;
    }
    
    @media (max-width: 480px) {
        padding: 0 12px;
    }
`;

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
    
    @media (max-width: 480px) {
        padding: 0 5px;
    }
`;

const Title = styled(motion.h2)`
    font-size: 42px;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 32px;
    }
    
    @media (max-width: 480px) {
        font-size: 28px;
        margin-bottom: 8px;
    }
`;

const Desc = styled(motion.p)`
    font-size: 18px;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    margin: 20px auto 40px;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 16px;
        margin: 16px auto 30px;
    }
    
    @media (max-width: 480px) {
        font-size: 14px;
        margin: 12px auto 24px;
        max-width: 100%;
    }
`;

const ToggleButtonGroup = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 10px;
    width: 100%;
    margin-bottom: 10px;
    flex-wrap: nowrap;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        gap: 8px;
        justify-content: center;
        padding-bottom: 12px;
    }
    
    @media (max-width: 480px) {
        gap: 6px;
        padding: 0 5px 10px 5px;
    }
`;

const ToggleButton = styled(motion.div)`
    padding: 8px 16px;
    border-radius: 12px;
    cursor: pointer;
    background-color: ${({ $active, theme }) => ($active ? theme.primary + 20 : theme.card)};
    color: ${({ $active, theme }) => ($active ? theme.text_primary : theme.text_secondary)};
    transition: background-color 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    min-width: 80px;
    flex-shrink: 0;
    scroll-snap-align: start;
    font-size: 14px;
    text-align: center;

    &:hover {
        background-color: ${({ $active, theme }) => ($active ? theme.primary + 30 : theme.primary + 10)};
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        padding: 6px 12px;
        font-size: 12px;
        min-width: 70px;
    }
    
    @media (max-width: 480px) {
        padding: 5px 10px;
        font-size: 11px;
        min-width: 60px;
        border-radius: 10px;
    }
`;

const BlogPostContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
    padding: 20px;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        padding: 15px;
        gap: 15px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        padding: 10px;
        gap: 12px;
    }
`;

const BlogPost = styled(motion(Link))`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 5px;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    display: block;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px;
    }
    
    @media (max-width: 768px) {
        padding: 16px;
    }
    
    @media (max-width: 480px) {
        padding: 14px;
    }
`;

const PostTitle = styled.h3`
    color: inherit;
    margin: 0 0 10px;
    font-size: 1.25rem;
    
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
        margin: 0 0 8px;
    }
`;

const PostContent = styled.p`
    color: inherit;
    margin: 10px 0;
    font-size: 1rem;
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin: 8px 0;
    }
`;

const PostDate = styled.span`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 0.8em;
    
    @media (max-width: 480px) {
        font-size: 0.75em;
    }
`;

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); // No need for loading state
    const [error, setError] = useState(null);
    const [toggle, setToggle] = useState('all');

    // Use the blogPosts data as the initial state
    useEffect(() => {
        setPosts(blogPosts); // Set posts directly from blogPosts
    }, []);

    const filteredPosts = toggle === 'all' ? posts : posts.filter(post => post.category === toggle);

    return (
        <SectionContainer>
            <Container id="blog">
                <BlogListMeta />
                <Wrapper>
                    <Title initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        My Blog
                    </Title>
                    <Desc initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        Explore insights on various topics in technology and development.
                    </Desc>

                    <ToggleButtonGroup>
                        {['all', 'tech', 'development', 'career'].map(category => (
                            <ToggleButton 
                                key={category} 
                                $active={toggle === category} 
                                onClick={() => setToggle(category)}
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }}
                            >
                                {category.toUpperCase()}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                    <BlogPostContainer>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post, index) => (
                                <BlogPost
                                    key={post.slug || index}
                                    to={`/blog/${post.slug}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <PostTitle>{post.title}</PostTitle>
                                    <PostContent>{post.content.substring(0, 100)}...</PostContent>
                                    <PostDate>{new Date(post.date).toLocaleDateString()}</PostDate>
                                </BlogPost>
                            ))
                        ) : (
                            <div>No blog posts available.</div>
                        )}
                    </BlogPostContainer>
                </Wrapper>
            </Container>
        </SectionContainer>
    );
};

export default Blog;