import React from 'react';
import { CloseRounded, CalendarToday, Person, AccessTime } from '@mui/icons-material';
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
`;

const Wrapper = styled.div`
    max-width: 800px;
    width: 90%;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    padding: 20px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); // Shadow for depth
    
    @media (max-width: 600px) {
        padding: 16px; // Reduced padding for smaller screens
    }
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 12px 0; // Standardized margin

    @media (max-width: 600px) {
        font-size: 24px; // Smaller font size for mobile
        margin: 8px 0; // Adjusted margin for smaller screens
    }
`;

const MetaData = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 12px 0; // Standardized margin
    color: ${({ theme }) => theme.text_secondary};
    font-size: 14px;

    & > div {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    @media (max-width: 600px) {
        flex-direction: column; // Stack metadata on smaller screens
        align-items: flex-start; // Align items to start for better spacing
    }
`;

const Content = styled.div`
    font-size: 16px;
    line-height: 1.8;
    color: ${({ theme }) => theme.text_primary};
    margin: 12px 0; // Standardized margin

    & img {
        max-width: 100%;
        border-radius: 8px;
        margin: 20px 0; // Consistent margin
    }

    & code {
        background: ${({ theme }) => theme.bgLight};
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
    }

    & pre {
        background: ${({ theme }) => theme.bgLight};
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
    }

    @media (max-width: 600px) {
        font-size: 14px; // Smaller font size for mobile
    }
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0; // Standardized margin
    justify-content: center; // Center the tags

    @media (max-width: 600px) {
        justify-content: flex-start; // Align to the start on mobile
    }
`;

const Tag = styled.span`
    background-color: ${({ theme }) => theme.primary + 20};
    color: ${({ theme }) => theme.primary};
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
`;

const BlogDetails = ({ openModal, setOpenModal }) => {
    const blog = openModal?.blog;

    return (
        <Modal open={true} onClose={() => setOpenModal({ state: false, blog: null })}>
            <Container>
                <Wrapper>
                    <CloseRounded
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => setOpenModal({ state: false, blog: null })}
                    />
                    
                    <Title>{blog?.title}</Title>
                    
                    <MetaData>
                        <div>
                            <Person fontSize="small" />
                            {blog?.author}
                        </div>
                        <div>
                            <CalendarToday fontSize="small" />
                            {new Date(blog?.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                            <AccessTime fontSize="small" />
                            {blog?.readTime}
                        </div>
                    </MetaData>

                    {blog?.image && (
                        <img 
                            src={blog.image} 
                            alt={blog.title}
                            style={{ 
                                width: '100%', 
                                borderRadius: '8px', 
                                marginTop: '12px' 
                            }} 
                        />
                    )}

                    <Content>
                        <ReactMarkdown>{blog?.content}</ReactMarkdown>
                    </Content>

                    <Tags>
                        {blog?.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </Tags>
                </Wrapper>
            </Container>
        </Modal>
    );
};

export default BlogDetails;