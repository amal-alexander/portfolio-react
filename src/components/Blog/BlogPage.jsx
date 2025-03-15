import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
    margin: 0 auto;
`;

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
`;

const Title = styled(motion.h2)`
    font-size: 42px;
    color: ${({ theme }) => theme.text_primary};

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

const Desc = styled(motion.p)`
    font-size: 18px;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 40px; /* Add margin for spacing */
    text-align: center; /* Center align text */
`;

const ToggleButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const ToggleButton = styled(motion.div)`
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    background-color: ${({ $active, theme }) => ($active ? theme.primary + 20 : theme.card)};
    color: ${({ $active, theme }) => ($active ? theme.text_primary : theme.text_secondary)};
    transition: background-color 0.3s ease, transform 0.3s ease;
    margin: 0 10px; /* Add margin for spacing between buttons */

    &:hover {
        background-color: ${({ $active, theme }) => ($active ? theme.primary + 30 : theme.primary + 10)};
        transform: scale(1.05);
    }
`;

const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
`;

const SliderButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: ${({ theme }) => theme.text_primary};
    padding: 0 10px; /* Add padding for better button spacing */
`;

const BlogPostContainer = styled.div`
    display: flex;
    gap: 20px; /* Space between blog posts */
    overflow: hidden;
    justify-content: center; /* Center the posts */
`;

const BlogPost = styled(motion.div)`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    min-width: 250px;
    max-width: 300px;
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
    const [toggle, setToggle] = useState('all');
    const postsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);
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
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage); // Using Math.ceil for correct pagination logic
    const currentPosts = filteredPosts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

    const nextPage = () => {
        setCurrentPage(prev => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
    };

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

                    <SliderContainer>
                        <SliderButton onClick={prevPage} aria-label="previous page"><FaChevronLeft /></SliderButton>
                        <BlogPostContainer>
                            <AnimatePresence>
                                {loading ? (
                                    <div>Loading...</div>
                                ) : error ? (
                                    <div>{error}</div>
                                ) : (
                                    currentPosts.map((post, index) => (
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
                            </AnimatePresence>
                        </BlogPostContainer>
                        <SliderButton onClick={nextPage} aria-label="next page"><FaChevronRight /></SliderButton>
                    </SliderContainer>
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