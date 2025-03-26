import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components for Blog Card
const CardContainer = styled(motion.div)`
    border: none;
    padding: 24px;
    border-radius: 16px;
    width: 100%;
    min-width: 280px;
    max-width: 340px;
    margin: 12px;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    transition: all 0.4s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: ${({ theme }) => theme.primary};
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);

        &:before {
            transform: scaleX(1);
        }
    }

    opacity: 0;  // For mount animation
    
    @media (max-width: 768px) {
        max-width: 100%;
        min-width: 200px;
        padding: 16px;
    }
    
    @media (max-width: 480px) {
        padding: 14px;
        margin: 8px 4px;
    }
`;

const CardTitle = styled(motion.h3)`
    margin: 0 0 16px 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.3;
    letter-spacing: -0.02em;
    transition: color 0.3s ease
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
        margin: 0 0 8px 0;
    }
`;

const CardContent = styled(motion.p)`
    margin: 12px 0;
    font-size: 1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin: 8px 0;
    }
`;

const CardDate = styled.span`
    display: inline-block;
    margin-top: 16px;
    font-size: 0.9em;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    opacity: 0.8;
    padding: 4px 8px;
    background: ${({ theme }) => theme.card_light};
    border-radius: 6px
`;

const BlogCard = ({ post }) => {
    return (
        <CardContainer animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <CardTitle>{post.title}</CardTitle>
            <CardContent>{post.content}</CardContent>
            <CardDate>{new Date(post.createdAt).toLocaleDateString() || 'Invalid Date'}</CardDate>
        </CardContainer>
    );
};

export default BlogCard;