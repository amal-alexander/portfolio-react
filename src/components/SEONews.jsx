import React, { useState, useEffect } from "react";
import { seoNews } from "../data/constants.js";
import NewsCard from "./Card/NewsCard.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fetchArticles } from "../api.js";

const Container = styled.section`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
    padding: 50px 20px;
    
    @media (max-width: 480px) {
        padding: 40px 16px;
    }
`;

const Title = styled(motion.h2)`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

const Description = styled(motion.p)`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    
    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

const CardGrid = styled(motion.div)`
    display: flex;
    gap: 24px;
    padding: 20px 0;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    max-width: 1200px;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 20px;
        overflow-x: visible;
        overflow-y: auto;
        max-height: 600px;
    }
    
    @media (max-width: 480px) {
        gap: 16px;
        padding: 15px 0;
        max-height: 500px;
    }
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    padding: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    opacity: 0.8;

    &:hover {
        transform: translateY(-50%) scale(1.1);
        background: ${({ theme }) => theme.card_light};
        opacity: 1;
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
        transform: translateY(-50%);
    }

    ${props => props.direction === 'left' ? 'left: -20px;' : 'right: -20px;'}

    @media (max-width: 1200px) {
        ${props => props.direction === 'left' ? 'left: -15px;' : 'right: -15px;'}
    }

    @media (max-width: 768px) {
        ${props => props.direction === 'left' ? 'left: -10px;' : 'right: -10px;'}
        width: 35px;
        height: 35px;
        padding: 8px;
    }
`;

const SEONews = () => {
    const sliderRef = React.useRef(null);

    const scroll = (direction) => {
        const container = sliderRef.current;
        if (container) {
            // Check if we're on mobile (using window width)
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // On mobile, scroll vertically
                const scrollAmount = direction === 'left' ? -300 : 300;
                container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            } else {
                // On desktop, scroll horizontally
                const scrollAmount = direction === 'left' ? -400 : 400;
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <Container id="seo-news">
            <Title
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Latest SEO News
            </Title>
            <Description
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Stay updated with the latest trends and insights in SEO.
            </Description>
            <SliderContainer>
                <NavButton direction="left" onClick={() => scroll('left')}>
                    <FaChevronLeft />
                </NavButton>
                <CardGrid
                    ref={sliderRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {seoNews.map((update, index) => (
                        <NewsCard key={index} newsItem={update} />
                    ))}
                </CardGrid>
                <NavButton direction="right" onClick={() => scroll('right')}>
                    <FaChevronRight />
                </NavButton>
            </SliderContainer>
        </Container>
    );
};

export default SEONews;