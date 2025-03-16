import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BlogDetails from './BlogDetails'; // Import BlogDetails for modal

const SectionContainer = styled.section`
    padding: 80px 0;
    background-color: ${({ theme }) => theme.background}; /* Overall background color */
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto; /* Center the max width in viewport */
    padding: 0 20px;
`;

const Wrapper = styled.div`
    text-align: center; /* Ensure text is centered */
    width: 100%;
`;

const Title = styled(motion.h2)`
    font-size: 42px;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 10px; /* Reduced margin */
    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

const Desc = styled(motion.p)`
    font-size: 18px;
    max-width: 600px; /* Limit the width for better readability */
    color: ${({ theme }) => theme.text_secondary};
    margin: 20px auto 40px; /* Center the description with auto margins */
    text-align: center; /* Center align text */
`;

const ToggleButtonGroup = styled.div`
    display: flex;
    justify-content: flex-start; /* Align buttons to the start */
    gap: 10px;
    overflow-x: auto; /* Enable horizontal scrolling */
    padding-bottom: 10px; /* Reduced padding to make it tighter */
    width: 100%;
    margin-bottom: 10px; /* Reduced margin to reduce the space below the tabs */
    flex-wrap: nowrap;
    scroll-snap-type: x mandatory; /* Smooth snap scrolling */
    -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */

    /* Hide Scrollbar */
    -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
    ::-webkit-scrollbar {
        display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
    }

    @media (max-width: 768px) {
        gap: 8px; /* Reduce gap between buttons on mobile */
    }
`;

const ToggleButton = styled(motion.div)`
    padding: 8px 16px; /* Adjusted padding */
    border-radius: 12px;
    cursor: pointer;
    background-color: ${({ $active, theme }) => ($active ? theme.primary + 20 : theme.card)};
    color: ${({ $active, theme }) => ($active ? theme.text_primary : theme.text_secondary)};
    transition: background-color 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    min-width: 80px; /* Reduced minimum width for mobile */
    flex-shrink: 0;
    scroll-snap-align: start; /* Align each tab to the start when scrolling */
    font-size: 14px; /* Reduced font size for mobile */

    &:hover {
        background-color: ${({ $active, theme }) => ($active ? theme.primary + 30 : theme.primary + 10)};
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        padding: 6px 12px; /* Further reduce padding for mobile */
        font-size: 12px; /* Smaller font size for mobile */
    }
`;

const BlogPostContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px; /* Space between blog posts */
    width: 100%;
    padding: 20px;
`;

const BlogPost = styled(motion.div)`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 5px;
    background-color: ${({ theme }) => theme.card}; /* Ensure background follows theme */
    color: ${({ theme }) => theme.text_primary}; /* Ensure text matches theme */
    text-align: left; /* Align text to left for better readability */
`;

const PostTitle = styled.h3`
    color: inherit; /* Inherit color from BlogPost */
    margin: 0 0 10px; /* Space below title */
`;

const PostContent = styled.p`
    color: inherit; /* Inherit color from BlogPost */
    margin: 10px 0;
`;

const PostDate = styled.span`
    color: ${({ theme }) => theme.text_secondary}; /* Date color */
    font-size: 0.8em;
`;

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toggle, setToggle] = useState('all'); // Ensure 'all' tab is selected by default
    const [openModal, setOpenModal] = useState({ state: false, blog: null });

    useEffect(() => {
        import('../../data/blogPosts').then(module => {
            setPosts(module.default);
            setLoading(false);
        }).catch(err => {
            setError('Failed to load blog posts');
            setLoading(false);
        });
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
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            filteredPosts.map((post, index) => (
                                <BlogPost
                                    key={post.id || index}
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    exit={{ opacity: 0, scale: 0.9 }} 
                                    transition={{ duration: 0.5 }}
                                    onClick={() => openBlogDetails(post)}
                                >
                                    <PostTitle>{post.title}</PostTitle>
                                    <PostContent>{post.content.substring(0, 100)}...</PostContent>
                                    <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
                                </BlogPost>
                            ))
                        )}
                    </BlogPostContainer>
                </Wrapper>
            </Container>

            {/* Render BlogDetails Modal */}
            {openModal.state && (
                <BlogDetails 
                    openModal={openModal} 
                    setOpenModal={setOpenModal} 
                />
            )}
        </SectionContainer>
    );
};

export default Blog;