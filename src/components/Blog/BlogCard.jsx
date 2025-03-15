import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components for Blog Card
const CardContainer = styled(motion.div)`
    border: 1px solid var(--text-gray-700); /* Using the CSS variable */
    padding: 20px;
    border-radius: 8px;
    min-width: 250px;
    max-width: 300px;
    margin: 10px;
    background-color: var(--bg-white); /* Background for light mode */
    color: var(--text-gray-700); /* Text color for dark mode */
    transition: background-color 0.3s ease;

    /* Adding a hover effect */
    &:hover {
        background-color: var(--bg-gray-100); /* Lightens on hover */
    }

    opacity: 0;  // To enable the animation on mount
`;

const CardTitle = styled(motion.h3)`
    margin: 0 0 10px 0;
    font-size: 1.25rem;  /* Adjusted font size */
    font-weight: 600;
    color: var(--text-gray-900); /* Main title color */
`;

const CardContent = styled(motion.p)`
    margin: 10px 0;
    font-size: 1rem;  /* Font size for content */
    color: var(--text-gray-500); /* Lighter text color */
`;

const CardDate = styled.span`
    font-size: 0.8em;
    color: var(--text-gray-500); /* Date color consistent with theme */
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