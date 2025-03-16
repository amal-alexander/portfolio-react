import React from "react";
import { CloseRounded } from "@mui/icons-material";
import { Modal } from "@mui/material";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

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
        padding: 2px 6px;
        border-radius: 4px;
        font-family: "Courier New", monospace;
    }

    & pre {
        background: ${({ theme }) => theme.bgLight};
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
    }
`;

const BlogDetails = ({ openModal, setOpenModal }) => {
    const post = openModal?.blog;

    if (!post) return null;

    return (
        <Modal open={openModal.state} onClose={() => setOpenModal({ state: false, blog: null })}>
            <Container>
                <Wrapper>
                    <CloseRounded
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            cursor: "pointer",
                            color: "inherit", // Keep it adaptive to theme
                        }}
                        onClick={() => setOpenModal({ state: false, blog: null })}
                    />
                    
                    <Title>{post.title}</Title>
                    
                    <MetaData>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </MetaData>

                    <Content>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </Content>
                </Wrapper>
            </Container>
        </Modal>
    );
};

export default BlogDetails;