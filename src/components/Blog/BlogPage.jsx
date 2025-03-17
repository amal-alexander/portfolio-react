import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BlogDetails from './BlogDetails';
import blogPosts from './blogPosts'; // Import the blogPosts data

const SectionContainer = styled.section`
    padding: 80px 0;
    background-color: ${({ theme }) => theme.background};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
`;

const Title = styled(motion.h2)`
    font-size: 42px;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

const Desc = styled(motion.p)`
    font-size: 18px;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    margin: 20px auto 40px;
    text-align: center;
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

    &:hover {
        background-color: ${({ $active, theme }) => ($active ? theme.primary + 30 : theme.primary + 10)};
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        padding: 6px 12px;
        font-size: 12px;
    }
`;

const BlogPostContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
    padding: 20px;
`;

const BlogPost = styled(motion.div)`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 5px;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
`;

const PostTitle = styled.h3`
    color: inherit;
    margin: 0 0 10px;
`;

const PostContent = styled.p`
    color: inherit;
    margin: 10px 0;
`;

const PostDate = styled.span`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 0.8em;
`;

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); // No need for loading state
    const [error, setError] = useState(null);
    const [toggle, setToggle] = useState('all');
    const [openModal, setOpenModal] = useState({ state: false, blog: null });

    // Use the blogPosts data as the initial state
    useEffect(() => {
        setPosts(blogPosts); // Set posts directly from blogPosts
    }, []);

    const filteredPosts = toggle === 'all' ? posts : posts.filter(post => post.category === toggle);

    const openBlogDetails = (blog) => {
        setOpenModal({ state: true, blog });
    };

    return (
        <SectionContainer>
            <Container id="blog">
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
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    onClick={() => openBlogDetails(post)}
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

            {/* Render BlogDetails Modal */}
            {openModal.state && (
                <BlogDetails openModal={openModal} setOpenModal={setOpenModal} />
            )}
        </SectionContainer>
    );
};

export default Blog;