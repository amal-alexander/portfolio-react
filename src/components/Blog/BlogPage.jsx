import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionContainer from '../common/SectionContainer';

const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 50px 20px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0;
    gap: 12px;
`;

const Title = styled.div`
    font-size: 42px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    text-align: center;
    margin: 20px 0;
`;

const Desc = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
`;

const ToggleButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin: 20px 0;
`;

const ToggleButton = styled.div`
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ active, theme }) => (active ? theme.primary + 20 : theme.card)};
    color: ${({ active, theme }) => (active ? theme.text_primary : theme.text_secondary)};
    &:hover {
        background-color: ${({ active, theme }) => (active ? theme.primary + 30 : theme.primary + 10)};
    }
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
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    &:hover {
        background: ${({ theme }) => theme.card_light};
    }

    ${({ direction }) => (direction === 'left' ? 'left: 0;' : 'right: 0;')}
`;

const BlogPost = styled(motion.div)`
    background-color: ${({ theme }) => theme.card};
    width: 300px;
    border-radius: 12px;
    padding: 20px;
    color: ${({ theme }) => theme.text_primary};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 16px;
    }
`;

const PostTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 10px;
`;

const PostContent = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.text_secondary};
`;

const PostDate = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 8px;
`;

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toggle, setToggle] = useState('all');
    const postsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        // Use local data or fetch from an API
        import('../../data/blogPosts').then(module => {
            setPosts(module.default);
            setLoading(false);
        }).catch(err => {
            setError('Failed to load blog posts');
            setLoading(false);
        });
    }, []);

    const filteredPosts = toggle === 'all' ? posts : posts.filter(post => post.category === toggle);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <SectionContainer>
            <Container id="blog">
                <Wrapper>
                    <Title>My Blog</Title>
                    <Desc>Explore my thoughts and insights on various topics in technology and development.</Desc>
                    <ToggleButtonGroup>
                        {['all', 'tech', 'development', 'career'].map(category => (
                            <ToggleButton key={category} active={toggle === category} onClick={() => setToggle(category)}>
                                {category.toUpperCase()}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <SliderContainer>
                        <SliderButton direction="left" onClick={prevPage}>&lt;</SliderButton>
                        <div style={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                currentPosts.map((post, index) => (
                                    <BlogPost key={post.id || index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                                        <PostTitle>{post.title}</PostTitle>
                                        <PostContent>{post.content}</PostContent>
                                        <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
                                    </BlogPost>
                                ))
                            )}
                        </div>
                        <SliderButton direction="right" onClick={nextPage}>&gt;</SliderButton>
                    </SliderContainer>
                </Wrapper>
            </Container>
        </SectionContainer>
    );
};

export default Blog;