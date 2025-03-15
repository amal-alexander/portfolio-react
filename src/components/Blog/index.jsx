import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BlogCard from './BlogCard';
import BlogDetails from './BlogDetails'; // Import BlogDetails
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Styled Components
const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 50px 20px;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0;
    gap: 12px;
`;

const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
`;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
`;

const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    padding: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    &:hover {
        background: ${({ theme }) => theme.card_light};
    }

    ${props => props.direction === 'left' ? 'left: 0;' : 'right: 0;'}
`;

const CardContainer = styled(motion.div)`
    display: flex;
    gap: 28px;
    padding: 20px;
    overflow: hidden;
`;

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [openModal, setOpenModal] = useState({ state: false, blog: null }); // State for modal visibility
    const postsPerPage = 3;

    useEffect(() => {
        import('../../data/blogPosts').then(module => {
            setPosts(module.default);
            setLoading(false);
        }).catch(err => {
            setError('Failed to load blog posts');
            setLoading(false);
        });
    }, []);

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const currentPosts = posts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const openBlogDetails = (blog) => {
        setOpenModal({ state: true, blog });
    };

    return (
        <Container>
            <Wrapper id="blog">
                <Title>My Blog</Title>
                <Desc>
                    Explore my thoughts and insights on various topics in technology and development.
                </Desc>
                <SliderContainer>
                    <SliderButton direction="left" onClick={prevPage}>
                        <FaChevronLeft />
                    </SliderButton>
                    <CardContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            currentPosts.map((post, index) => (
                                <BlogCard 
                                    key={index} 
                                    post={post} 
                                    onClick={() => openBlogDetails(post)} // Pass blog post to the handler
                                />
                            ))
                        )}
                    </CardContainer>
                    <SliderButton direction="right" onClick={nextPage}>
                        <FaChevronRight />
                    </SliderButton>
                </SliderContainer>
            </Wrapper>

            {/* Render BlogDetails Modal */}
            {openModal.state && (
                <BlogDetails 
                    openModal={openModal} 
                    setOpenModal={setOpenModal} 
                />
            )}
        </Container>
    );
};

export default Blog;