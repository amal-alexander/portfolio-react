import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background: ${({ theme }) => theme.card};
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 8px;
`;

const Description = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 16px;
`;

const MetaData = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
`;

const BlogCard = ({ post, onClick }) => {
    return (
        <Card onClick={onClick}>
            <Title>{post.title}</Title>
            <Description>{post.content.substring(0, 100)}...</Description>
            <MetaData>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.readTime}</span>
            </MetaData>
        </Card>
    );
};

export default BlogCard;