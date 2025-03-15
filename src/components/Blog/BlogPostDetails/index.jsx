import React from 'react';
import { CloseRounded } from '@mui/icons-material';
import { Modal } from '@mui/material';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    transition: all 0.5s ease;
`;

const Wrapper = styled.div`
    max-width: 800px;
    width: 90%;
    border-radius: 16px;
    margin: 20px;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 8px 6px 0px 6px;
    @media (max-width: 600px) {
        font-size: 24px;
    }
`;

const MetaData = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 8px 6px;
    color: ${({ theme }) => theme.text_secondary};
    font-size: 14px;
`;

const BlogImage = styled.img`
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;
    margin: 16px 0;
`;

const Content = styled.div`
    font-size: 16px;
    line-height: 1.8;
    color: ${({ theme }) => theme.text_primary};
    margin: 12px 6px;

    & img {
        max-width: 100%;
        border-radius: 8px;
        margin: 20px 0;
    }

    & code {
        background: ${({ theme }) => theme.bgLight};
        padding: 2px 4px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
    }

    & pre {
        background: ${({ theme }) => theme.bgLight};
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
    }
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 6px;
`;

const Tag = styled.span`
    background-color: ${({ theme }) => theme.primary}20; /* Slightly transparent primary color */
    color: ${({ theme }) => theme.primary};
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
`;

const BlogPostDetails = ({ openModal, setOpenModal }) => {
    const post = openModal?.post;

    if (!post) return null;

    return (
        <Modal 
            open={openModal.state} 
            onClose={() => setOpenModal({ state: false, post: null })}
        >
            <Container>
                <Wrapper>
                    <CloseRounded
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            cursor: "pointer",
                            color: "#fff", // You can use a theme color or specific color value
                        }}
                        onClick={() => setOpenModal({ state: false, post: null })}
                    />
                    
                    <Title>{post.title}</Title>
                    <MetaData>
                        <span><strong>Author:</strong> {post.author}</span>
                        <span><strong>Date:</strong> {new Date(post.createdAt).toLocaleDateString()}</span>
                    </MetaData>
                    
                    {post.image && <BlogImage src={post.image} alt={post.title} />}
                    
                    <Content>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </Content>
                    
                    {post.tags && post.tags.length > 0 && (
                        <Tags>
                            {post.tags.map((tag, index) => (
                                <Tag key={index}>{tag}</Tag>
                            ))}
                        </Tags>
                    )}
                </Wrapper>
            </Container>
        </Modal>
    );
};

export default BlogPostDetails;